import { Notify } from "./Notify/notify.js";

export const showNotification = (text, status) => {
  let style = "",
    delay = 3000;
  let notify = new Notify({ delay, corner: "top_left" });
  switch (status) {
    case "error":
      style = "danger";
      break;
    case "warning":
      style = "warning";
      break;
    case "message":
    default:
      style = "success";
      break;
  }

  notify.render({
    head: text || "Something happend",
    style,
  });
};
