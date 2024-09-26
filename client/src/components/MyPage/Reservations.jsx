import React, { useState, useEffect } from "react";

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const Reservations = ({ reservations }) => {
  const [currentReservations, setCurrentReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  useEffect(() => {
    const today = getToday();

    const current = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date);
      return reservationDate >= today;
    });

    const past = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date);
      return reservationDate < today;
    });

    setCurrentReservations(current);
    setPastReservations(past);
  }, [reservations]);

  const handleDelete = (id) => {
    setCurrentReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== id)
    );
  };

  return (
    <div>
      {/* 현재 예약 */}
      <h2 className="text-xl font-semibold mb-4">Current Reservations</h2>
      <ul>
        {currentReservations.length > 0 ? (
          currentReservations.map((reservation, index) => (
            <li
              key={index}
              className="mb-4 border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Restaurant:</strong> {reservation.restaurant}
                </p>
                <p>
                  <strong>Location:</strong> {reservation.location}
                </p>
                <div className="flex gap-5">
                  <p className="flex items-center">
                    <img
                      src="./assets/person.svg"
                      className="w-4 h-4 mr-1"
                      alt="Person Icon"
                    />
                    {reservation.people}
                  </p>
                  <p className="flex items-center gap-2">
                    <img
                      src="./assets/date.svg"
                      className="w-4 h-4"
                      alt="Date Icon"
                    />
                    {reservation.date} / {reservation.time}
                  </p>
                </div>
              </div>
              <button
                className="mt-2 p-2 bg-red-500 text-white rounded"
                onClick={() => handleDelete(reservation.id)}
              >
                예약 취소
              </button>
            </li>
          ))
        ) : (
          <p className="text-center font-bold my-10">
            현재 예약된 식당이 없습니다.
          </p>
        )}
      </ul>
      {/* 구분선 */}
      <div className="border-b border-gray-300 mt-14"></div>

      {/* 과거 예약 */}
      <h2 className="text-xl font-semibold mb-6 mt-8">Past Reservations</h2>
      <ul>
        {pastReservations.length > 0 ? (
          pastReservations.map((reservation, index) => (
            <li
              key={index}
              className="mb-4 border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Restaurant:</strong> {reservation.restaurant}
                </p>
                <p>
                  <strong>Location:</strong> {reservation.location}
                </p>
                <div className="flex gap-5">
                  <p className="flex items-center">
                    <img
                      src="./assets/person.svg"
                      className="w-4 h-4 mr-1"
                      alt="Person Icon"
                    />
                    {reservation.people}
                  </p>
                  <p className="flex items-center gap-2">
                    <img
                      src="./assets/date.svg"
                      className="w-4 h-4"
                      alt="Date Icon"
                    />
                    {reservation.date} / {reservation.time}
                  </p>
                </div>
                <p>
                  <strong className="text-green-500">예약완료</strong>
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center font-bold">과거 예약된 식당이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};
