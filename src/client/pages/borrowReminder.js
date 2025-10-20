import React from 'react';

const BorrowReminder = () => {
    const reminders = [
        { title: "Book Title 1", dueDate: "2023-10-15" },
        { title: "Book Title 2", dueDate: "2023-10-20" },
        // Add more reminders as needed
    ];

    return (
        <div className="borrow-reminder">
            <h1>Borrow Reminders</h1>
            <ul>
                {reminders.map((reminder, index) => (
                    <li key={index}>
                        <span>{reminder.title}</span> - <span>Due: {reminder.dueDate}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BorrowReminder;