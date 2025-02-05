import { useState, useEffect } from "react";
const dayInMilli = 24 * 60 * 60 * 1000;
const LONG_DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
const LONG_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octuber",
  "November",
  "December",
];

const Calendar = ({ value, onChange }) => {
  const [days, setDays] = useState([]);
  const today = new Date(value);

  useEffect(() => {
    const feb = today.getFullYear() % 4 === 0 ? 29 : 28;
    const daysXMonth = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const e = new Date(today.getTime());
    e.setDate(e.getDate() - e.getDate());
    let a = Array(42).fill(null);
    let i = 0;
    if (e.getDay() !== 6) {
      for (; i <= e.getDay(); i++) {
        a[i] = new Date(e.getTime() - dayInMilli * (e.getDay() - i));
      }
    }
    console.log(a);
    for (let j = 1; j <= daysXMonth[today.getMonth()]; j++) {
      a[i++] = new Date(e.getTime() + dayInMilli * j);
    }
    console.log(a);
    e.setDate(e.getDate() + daysXMonth[today.getMonth()]);
    for (let j = 1; i < a.length; j++) {
      a[i++] = new Date(e.getTime() + dayInMilli * j);
    }
    console.log(a);
    setDays(a);
  }, [value]);

  return (
    <div
      style={{
        backgroundColor: "rgb(29,29,29)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <div style={{ color: "greenyellow", flex: "1 1 auto" }}>
          {LONG_DAYS[today.getDay()]}
        </div>
        <div style={{ flex: "3 1 auto" }}>{today.getDate()}</div>
      </div>
      <div style={{ display: "flex", flexFlow: "column" }}>
        <div
          style={{
            textAlign: "center",
            color: "greenyellow",
          }}
        >
          <button
            onClick={() => onChange(today.getTime() - dayInMilli)}
            style={{ backgroundColor: "rgb(29,29,29)", color: "white" }}
          >
            {"<<"}
          </button>
          {LONG_MONTHS[today.getMonth()]} {today.getFullYear()}
          <button
            onClick={() => onChange(today.getTime() + dayInMilli)}
            style={{ backgroundColor: "rgb(29,29,29)", color: "white" }}
          >
            {">>"}
          </button>
        </div>
        <table>
          <thead>
            <tr
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                color: "gray",
              }}
            >
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <th
                  style={{
                    minHeight: 40,
                    minWidth: 50,
                    alignContent: "center",
                  }}
                  key={"head-" + i}
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(days.length / 7)].map((_, i) => (
              <tr
                key={"week-" + i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                }}
              >
                {[...Array(7)].map((_, j) => {
                  const isThisMonth =
                    today.getMonth() === days[i * 7 + j]?.getMonth();
                  const isToday =
                    isThisMonth &&
                    today.getDate() === days[i * 7 + j]?.getDate();

                  return (
                    <td
                      key={i * 7 + j}
                      onClick={() => onChange(days[i * 7 + j]?.getTime())}
                      style={{
                        color: isToday
                          ? "greenyellow"
                          : isThisMonth
                          ? "white"
                          : "gray",
                        minHeight: 34,
                        minWidth: 44,
                        alignContent: "center",
                        textAlign: "center",
                        padding: 4,
                        cursor: "pointer",
                      }}
                    >
                      {days[i * 7 + j]?.getDate()}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
