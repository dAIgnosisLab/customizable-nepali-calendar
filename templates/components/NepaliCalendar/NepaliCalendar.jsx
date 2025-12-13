import React, { useState } from "react";
import BS_CALENDAR from "../../data/bsCalendar";
import TODAY from "../../data/today";
import { LOCALES } from "../../data/locales";
import { DAY_ANNOTATIONS } from "../../data/dayAnnotations";
import { COLOR_TOKENS } from "../../data/colorTokens";
import { getMonthMeta, formatNumber } from "../../engine/calendarEngine";
import { getDayAnnotations } from "../../engine/annotationEngine";
import "../../styles/calendar.css";

function NepaliCalendar({
  width = 360,
  height = 420,
  initialYear = 2081,
  initialMonth = 0,
  language = "ne",
  className = "",
  style = {},
  layout = {},
  colors = {},
  colorTokens = {},
}) {
  const locale = LOCALES[language] || LOCALES.ne;

  const withUnit = (value) =>
    typeof value === "number" ? `${value}px` : value;

  const colorDefaults = {
    primary: "#2563eb",
    primarySoft: "#dbeafe",
    bgMain: "#ffffff",
    bgSoft: "#f1f5f9",
    bgHover: "#e0f2fe",
    holidayBg: "#fff1f2",
    holidayText: "#dc2626",
    textMain: "#0f172a",
    textMuted: "#64748b",
  };

  const mergedColorTokens = { ...COLOR_TOKENS, ...colorTokens };

  const layoutDefaults = {
    containerWidth: width,
    containerHeight: height,
    headerHeight: "auto",
    headerPadding: "1em",
    weekdaysHeight: "auto",
    weekdaysPadding: "0 0 6px 0",
    gridGap: "8px",
    gridPadding: "10px",
    dayCellMinHeight: "64px",
    dayCellMinWidth: "40px",
    dayCellPadding: "6px 2px",
  };

  const resolvedLayout = { ...layoutDefaults, ...layout };

  const containerStyle = {
    width: withUnit(resolvedLayout.containerWidth),
    height: withUnit(resolvedLayout.containerHeight),
    "--primary": colors.primary || colorDefaults.primary,
    "--primary-soft": colors.primarySoft || colorDefaults.primarySoft,
    "--bg-main": colors.bgMain || colorDefaults.bgMain,
    "--bg-soft": colors.bgSoft || colorDefaults.bgSoft,
    "--bg-hover": colors.bgHover || colorDefaults.bgHover,
    "--holiday-bg": colors.holidayBg || colorDefaults.holidayBg,
    "--holiday-text": colors.holidayText || colorDefaults.holidayText,
    "--text-main": colors.textMain || colorDefaults.textMain,
    "--text-muted": colors.textMuted || colorDefaults.textMuted,
    "--header-height": withUnit(resolvedLayout.headerHeight),
    "--header-padding": resolvedLayout.headerPadding,
    "--weekdays-height": withUnit(resolvedLayout.weekdaysHeight),
    "--weekdays-padding": resolvedLayout.weekdaysPadding,
    "--grid-gap": withUnit(resolvedLayout.gridGap),
    "--grid-padding": withUnit(resolvedLayout.gridPadding),
    "--cell-min-height": withUnit(resolvedLayout.dayCellMinHeight),
    "--cell-min-width": withUnit(resolvedLayout.dayCellMinWidth),
    "--cell-padding": resolvedLayout.dayCellPadding,
    ...style,
  };

  //date range
  const availableYears = Object.keys(BS_CALENDAR.years)
    .map(Number)
    .sort((a, b) => a - b);

  const minYear = availableYears[0];
  const maxYear = availableYears[availableYears.length - 1];

  const [year, setYear] = useState(
    Math.min(Math.max(initialYear, minYear), maxYear)
  );
  const [monthIndex, setMonthIndex] = useState(initialMonth);
  const [activeDay, setActiveDay] = useState(null);

  const isAtMin = year === minYear && monthIndex === 0;
  const isAtMax = year === maxYear && monthIndex === 11;

  const meta = getMonthMeta(BS_CALENDAR, year, monthIndex);
  //never disapper
  if (!meta) {
    return (
      <div
        className={`nepali-calendar ${className}`}
        style={containerStyle}
      >
        <div style={{ padding: 16, textAlign: "center" }}>
          Calendar data not available
        </div>
      </div>
    );
  }

  const { daysInMonth, startWeekday } = meta;

  function nextMonth() {
    if (isAtMax) return;

    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((y) => y + 1);
    } else {
      setMonthIndex((m) => m + 1);
    }
  }

  function prevMonth() {
    if (isAtMin) return;

    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((y) => y - 1);
    } else {
      setMonthIndex((m) => m - 1);
    }
  }

  return (
    <>
      <div
        className={`nepali-calendar ${className}`}
        style={containerStyle}
        lang={locale.lang}
      >
        <div className="calendar-header">
          <button onClick={prevMonth} disabled={isAtMin}>
            ‹
          </button>

          <div className="calendar-title">
            <div className="month">{locale.months[monthIndex]}</div>
            <div className="year">{formatNumber(year, locale)}</div>
          </div>

          <button onClick={nextMonth} disabled={isAtMax}>
            ›
          </button>
        </div>

        <div className="calendar-weekdays">
          {locale.weekdays.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {Array.from({ length: startWeekday }).map((_, i) => (
            <div key={`e-${i}`} className="calendar-cell empty" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;

            const annotations = getDayAnnotations(
              DAY_ANNOTATIONS,
              year,
              monthIndex,
              day
            );

            const holiday = annotations.find((a) => a.type === "holiday");

            const isToday =
              TODAY.year === year &&
              TODAY.monthIndex === monthIndex &&
              TODAY.day === day;

            return (
              <div
                key={day}
                className={`calendar-cell
                  ${holiday ? "holiday-cell" : ""}
                  ${isToday ? "today-cell" : ""}
                `}
                onClick={() =>
                  setActiveDay({ year, monthIndex, day, annotations })
                }
              >
                <span className="day-number">{formatNumber(day, locale)}</span>

                {holiday && (
                  <span className="holiday-label">
                    {holiday.label[language]}
                  </span>
                )}

                <div className="annotation-dots">
                  {annotations.map((a, idx) => (
                    <span
                      key={idx}
                      className="annotation-dot"
                      style={{
                        backgroundColor: mergedColorTokens[a.color],
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeDay && (
        <div className="calendar-overlay" onClick={() => setActiveDay(null)}>
          <div className="calendar-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <span>
                {locale.months[monthIndex]}{" "}
                {formatNumber(activeDay.day, locale)}
              </span>
              <button onClick={() => setActiveDay(null)}>✕</button>
            </div>

            <div className="popup-content">
              {activeDay.annotations.length === 0 ? (
                <p className="muted">No events</p>
              ) : (
                activeDay.annotations.map((a, idx) => (
                  <div key={idx} className="popup-item">
                    <span
                      className="popup-dot"
                      style={{
                        backgroundColor: mergedColorTokens[a.color],
                      }}
                    />
                    <span>{a.label[language]}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NepaliCalendar;
