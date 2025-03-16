class BookingQueue {
    constructor() {
        this.items = [];
    }

    /**
     * Enqueue booking request
     * @param {Object} item - Booking details { userId, tableId, date, time, remarks }
     * @param {number} priority - Optional priority (higher number = higher priority)
     */
    enqueue(item, priority = 0) {
        const newItem = { item, priority };
        
        if (this.items.length === 0 || priority === 0) {
            // 普通队列 (FIFO)
            this.items.push(newItem);
        } else {
            // 优先队列 (Priority Queue 插入)
            let added = false;
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].priority < priority) {
                    this.items.splice(i, 0, newItem);
                    added = true;
                    break;
                }
            }
            if (!added) this.items.push(newItem);
        }
    }

    /** 取出队列的第一个预订（无论普通或 VIP） */
    dequeue() {
        return this.items.shift()?.item; // 返回排队最前面的 booking
    }

    /** 检查队列是否为空 */
    isEmpty() {
        return this.items.length === 0;
    }

    /** 获取队列大小 */
    size() {
        return this.items.length;
    }
}

module.exports = BookingQueue;