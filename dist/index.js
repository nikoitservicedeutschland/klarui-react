import { jsx as m } from "react/jsx-runtime";
const y = "_button_xvfyr_1", x = "_small_xvfyr_31", v = "_medium_xvfyr_37", g = "_large_xvfyr_42", p = "_primary_xvfyr_49", b = "_secondary_xvfyr_65", h = "_success_xvfyr_81", W = "_warning_xvfyr_97", w = "_error_xvfyr_113", B = "_outline_xvfyr_129", j = "_fullWidth_xvfyr_185", r = {
  button: y,
  small: x,
  medium: v,
  large: g,
  primary: p,
  secondary: b,
  success: h,
  warning: W,
  error: w,
  outline: B,
  fullWidth: j,
  "rounded-none": "_rounded-none_xvfyr_191",
  "rounded-small": "_rounded-small_xvfyr_195",
  "rounded-medium": "_rounded-medium_xvfyr_199",
  "rounded-large": "_rounded-large_xvfyr_203",
  "rounded-full": "_rounded-full_xvfyr_207"
}, N = ({
  variant: o = "primary",
  size: _ = "medium",
  rounded: n,
  outline: e = !1,
  fullWidth: s = !1,
  disabled: t = !1,
  children: l,
  onClick: u,
  type: d = "button",
  className: a = "",
  style: f,
  ...c
}) => {
  const i = [
    r.button,
    r[_],
    r[o],
    n && r[`rounded-${n}`],
    e && r.outline,
    s && r.fullWidth,
    a
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ m(
    "button",
    {
      type: d,
      className: i,
      style: f,
      onClick: u,
      disabled: t,
      ...c,
      children: l
    }
  );
};
N.displayName = "Button";
export {
  N as Button
};
//# sourceMappingURL=index.js.map
