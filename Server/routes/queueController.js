const BookingQueue = require('./bookingQueue');
const { executeQuery } = require('../models/db');

const bookingQueue = new BookingQueue();

/** 提交预订 (支持普通和 VIP) */
async function enqueueBooking(req, res) {
    const { tableId, date, time, remarks, priority } = req.body;
    const userId = req.user.id; // JWT 中的用户 ID

    try {
        const checkTable = await executeQuery("SELECT status FROM tables WHERE _id = ?", [tableId]);
        if (!checkTable.length || checkTable[0].status !== 'Available') {
            return res.status(400).json({ message: "Table is not available" });
        }

        // 统一入队，VIP 客户可以有更高 priority
        const bookingData = { userId, tableId, date, time, remarks, status: "Pending" };
        bookingQueue.enqueue(bookingData, priority || 0);

        res.status(202).json({ message: "Booking request added to queue", queueSize: bookingQueue.size() });
    } catch (error) {
        res.status(500).json({ error: "Database error", details: error.message });
    }
}

/** 处理预订（Waiter Only） */
async function processBookingQueue(req, res) {
    if (bookingQueue.isEmpty()) {
        return res.status(400).json({ message: "No pending bookings in queue" });
    }

    try {
        const booking = bookingQueue.dequeue(); // 取出最早或者最高优先级的

        await executeQuery(
            "INSERT INTO bookings (userId, tableId, date, time, remarks, status) VALUES (?, ?, ?, ?, ?, 'Confirmed')",
            [booking.userId, booking.tableId, booking.date, booking.time, booking.remarks]
        );

        await executeQuery("UPDATE tables SET status = 'Reserved' WHERE _id = ?", [booking.tableId]);

        res.json({ message: "Booking confirmed", booking });
    } catch (error) {
        res.status(500).json({ error: "Database error", details: error.message });
    }
}

module.exports = { enqueueBooking, processBookingQueue };