import dateApi from "date-and-time";

export const formatIsoDate = (date: Date) => {
  return dateApi.format(date, "YYYY-MM-DD");
};

export const formatDate = (value: Date | string | undefined) => {
  if (!value) return "-";
  if (typeof value === "string") {
    value = new Date(value);
  }
  return value.toLocaleDateString("de", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDateTime = (value: Date | string | undefined) => {
  if (!value) return "-";
  if (typeof value === "string") {
    value = new Date(value);
  }
  return value.toLocaleDateString("de", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTime = (value: Date | string | undefined) => {
  if (!value) return "-";
  if (typeof value === "string") {
    value = new Date(value);
  }
  return value.toLocaleTimeString("de", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatInputDateTime = (
  date: Date | null | string | undefined = new Date()
) => {
  if (date === undefined || date === null) return "";
  if (typeof date === "string") {
    return dateApi.format(new Date(date), "YYYY-MM-DDTHH:mm", false);
  }
  return dateApi.format(date, "YYYY-MM-DDTHH:mm", false);
};
