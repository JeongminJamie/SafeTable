import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { getMyReservation } from "../../service/reservationService";
import {
  formatDateToKorean,
  formatTimeToKoean,
  parseStringToDate,
} from "../../utils/dateAndTime";
import Loading from "../Loading";

export const Reservations = () => {
  const [currentReservations, setCurrentReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  const { data: reservations = [], isLoading } = useQuery({
    queryKey: ["getMyReservations"],
    queryFn: getMyReservation,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });

  const formattedDate = useCallback(
    (reservation) => {
      return formatDateToKorean(reservation?.date);
    },
    [reservations]
  );

  const formattedTime = useCallback(
    (reservation) => {
      return formatTimeToKoean(reservation.time);
    },
    [reservations]
  );

  useEffect(() => {
    const today = new Date();

    if (reservations.length !== 0) {
      const current = reservations.filter((reservation) => {
        const reservationDate = parseStringToDate(
          reservation.date,
          reservation.time
        );
        return reservationDate >= today;
      });

      const past = reservations.filter((reservation) => {
        const reservationDate = parseStringToDate(
          reservation.date,
          reservation.time
        );
        return reservationDate < today;
      });

      setCurrentReservations(current);
      setPastReservations(past);
    }
  }, [reservations]);

  const handleDelete = (id) => {
    setCurrentReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== id)
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading width="w-32" height="h-32" padding="p-10 mt-24 mb-24" />
      ) : (
        <div>
          {/* 현재 예약 */}
          <h2 className="text-xl font-semibold mb-4">Current Reservations</h2>
          <ul>
            {currentReservations.length > 0 ? (
              currentReservations.map((reservation) => (
                <li
                  key={reservation._id}
                  className="mb-4 border p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Restaurant:</strong> {reservation.name}
                    </p>
                    <p>
                      <strong>Location:</strong> {reservation.address}
                    </p>
                    <div className="flex gap-5">
                      <p className="flex items-center">
                        <img
                          src="./assets/person.svg"
                          className="w-4 h-4 mr-1"
                          alt="Person Icon"
                        />
                        {reservation.party_size}
                      </p>
                      <p className="flex items-center gap-2">
                        <img
                          src="./assets/date.svg"
                          className="w-4 h-4"
                          alt="Date Icon"
                        />
                        {formattedDate(reservation)} /{" "}
                        {formattedTime(reservation)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="mt-2 p-2 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(reservation._id)}
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
              pastReservations.map((reservation) => (
                <li
                  key={reservation._id}
                  className="mb-4 border p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Restaurant:</strong> {reservation.name}
                    </p>
                    <p>
                      <strong>Location:</strong> {reservation.address}
                    </p>
                    <div className="flex gap-5">
                      <p className="flex items-center">
                        <img
                          src="./assets/person.svg"
                          className="w-4 h-4 mr-1"
                          alt="Person Icon"
                        />
                        {reservation.party_size}
                      </p>
                      <p className="flex items-center gap-2">
                        <img
                          src="./assets/date.svg"
                          className="w-4 h-4"
                          alt="Date Icon"
                        />
                        {formattedDate(reservation)} /{" "}
                        {formattedTime(reservation)}
                      </p>
                    </div>
                    <p>
                      <strong className="text-green-500">예약완료</strong>
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center font-bold">
                과거 예약된 식당이 없습니다.
              </p>
            )}
          </ul>
        </div>
      )}
    </>
  );
};
