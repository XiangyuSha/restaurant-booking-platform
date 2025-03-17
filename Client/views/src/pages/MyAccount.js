import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

const MyAccount = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = localStorage.getItem('userEmail'); // Assuming email is stored after login

    useEffect(() => {
        if (!userEmail) {
            setLoading(false);
            return;
        }

        fetch(`/my-bookings?email=${userEmail}`)
            .then(res => res.json())
            .then(data => {
                setBookings(data.bookings);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [userEmail]);

    if (!userEmail) {
        return (
            <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3 }}>
                <Typography variant="h5">请先登录</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    您需要登录才能查看您的预订信息。
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => window.location.href = '/login'}>
                    去登录
                </Button>
            </Card>
        );
    }

    return (
        <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 3 }}>
            <Typography variant="h5">我的预订</Typography>

            {loading ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : bookings.length === 0 ? (
                <Typography variant="body1" sx={{ mt: 2 }}>没有找到预订记录</Typography>
            ) : (
                bookings.map((booking) => (
                    <CardContent key={booking.id} sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
                        <Typography variant="h6">桌号: {booking.tableId}</Typography>
                        <Typography>日期: {booking.date}</Typography>
                        <Typography>时间: {booking.time}</Typography>
                        <Typography>备注: {booking.remarks || '无'}</Typography>
                        <Typography>状态: {booking.status}</Typography>
                    </CardContent>
                ))
            )}
        </Card>
    );
};

export default MyAccount;