/* @ds-bundle: {"format":4,"namespace":"DynamicLayerDesignSystem_166dbf","components":[{"name":"DlButton","sourcePath":"components/buttons/DlButton.jsx"},{"name":"DlButtonDock","sourcePath":"components/buttons/DlButtonDock.jsx"},{"name":"DlButtonIcon","sourcePath":"components/buttons/DlButtonIcon.jsx"},{"name":"DlCard","sourcePath":"components/content/DlCard.jsx"},{"name":"DlBadge","sourcePath":"components/feedback/DlBadge.jsx"},{"name":"DlInput","sourcePath":"components/forms/DlInput.jsx"},{"name":"DlSeparator","sourcePath":"components/layout/DlSeparator.jsx"},{"name":"DlBottomNavigation","sourcePath":"components/navigation/DlBottomNavigation.jsx"},{"name":"DlTopNavigation","sourcePath":"components/navigation/DlTopNavigation.jsx"}],"sourceHashes":{"components/buttons/DlButton.jsx":"8fab6861a4e6","components/buttons/DlButtonDock.jsx":"d8f3817b920c","components/buttons/DlButtonIcon.jsx":"ab233517f738","components/content/DlCard.jsx":"572354f5a568","components/feedback/DlBadge.jsx":"9842c48e332f","components/forms/DlInput.jsx":"e228af882f31","components/layout/DlSeparator.jsx":"6dfad9e485b5","components/navigation/DlBottomNavigation.jsx":"da1d1164d629","components/navigation/DlTopNavigation.jsx":"2f718c9c5d7b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DynamicLayerDesignSystem_166dbf = window.DynamicLayerDesignSystem_166dbf || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/DlButton.jsx
try { (() => {
const {
  useState
} = React;
const HEIGHTS = {
  lg: 56,
  md: 48,
  sm: 40,
  xs: 32
};
const PADDINGS = {
  lg: '16px 24px',
  md: '12px 16px',
  sm: '8px 16px',
  xs: '4px 12px'
};
const GAPS = {
  lg: 8,
  md: 8,
  sm: 8,
  xs: 4
};
function colorsFor(type, disabled, pressed) {
  switch (type) {
    case 'secondary':
      return {
        bg: disabled ? 'var(--dl-grey-100)' : pressed ? 'var(--dl-grey-200)' : 'var(--dl-grey-100)',
        fg: disabled ? 'var(--dl-grey-600)' : 'var(--dl-black)',
        border: 'none'
      };
    case 'tertiary':
      return {
        bg: disabled ? 'var(--dl-white)' : pressed ? 'var(--dl-grey-100)' : 'var(--dl-white)',
        fg: disabled ? 'var(--dl-grey-500)' : 'var(--dl-black)',
        border: '1px solid var(--dl-grey-200)'
      };
    case 'ghost':
      return {
        bg: pressed ? 'var(--dl-grey-100)' : 'transparent',
        fg: disabled ? 'var(--dl-grey-500)' : 'var(--dl-black)',
        border: 'none'
      };
    default:
      return {
        bg: disabled ? 'var(--dl-grey-100)' : pressed ? 'var(--dl-grey-700)' : 'var(--dl-black)',
        fg: disabled ? 'var(--dl-grey-600)' : 'var(--dl-white)',
        border: 'none'
      };
  }
}
function DlButton({
  label,
  onClick,
  type = 'primary',
  size = 'lg',
  state = 'default',
  iconLeft,
  iconRight,
  fullWidth = false
}) {
  const [gesturePressed, setGesturePressed] = useState(false);
  const disabled = state === 'disabled' || !onClick;
  const pressed = state === 'pressed' || state === 'default' && gesturePressed;
  const c = colorsFor(type, disabled, pressed);
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    onMouseDown: disabled ? undefined : () => setGesturePressed(true),
    onMouseUp: disabled ? undefined : () => setGesturePressed(false),
    onMouseLeave: disabled ? undefined : () => setGesturePressed(false),
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: fullWidth ? '100%' : 'auto',
      minHeight: HEIGHTS[size],
      padding: PADDINGS[size],
      gap: GAPS[size],
      background: c.bg,
      color: c.fg,
      border: c.border,
      borderRadius: 'var(--dl-radius-md)',
      fontFamily: 'var(--dl-font-sans)',
      fontSize: 'var(--dl-font-size-3)',
      fontWeight: 'var(--dl-weight-semibold)',
      lineHeight: 'var(--dl-line-height-3)',
      cursor: disabled ? 'default' : 'pointer',
      whiteSpace: 'nowrap'
    }
  }, iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: c.fg
    }
  }, iconLeft) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, label), iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: c.fg
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { DlButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/DlButton.jsx", error: String((e && e.message) || e) }); }

// components/buttons/DlButtonDock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DlButtonDock({
  buttons,
  direction = 'horizontal',
  showSeparator = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      background: 'var(--dl-white)'
    }
  }, showSeparator ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: '100%',
      background: 'var(--dl-grey-200)'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      gap: 'var(--dl-space-16)',
      padding: 'var(--dl-space-16)'
    }
  }, buttons.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: direction === 'horizontal' ? 1 : 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.DlButton, _extends({}, b, {
    fullWidth: true
  }))))));
}
Object.assign(__ds_scope, { DlButtonDock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/DlButtonDock.jsx", error: String((e && e.message) || e) }); }

// components/buttons/DlButtonIcon.jsx
try { (() => {
const {
  useState
} = React;
const HEIGHTS = {
  lg: 56,
  md: 48,
  sm: 40,
  xs: 32
};
const PADDINGS = {
  lg: 16,
  md: 12,
  sm: 8,
  xs: 4
};
function colorsFor(type, disabled, pressed) {
  switch (type) {
    case 'secondary':
      return {
        bg: disabled ? 'var(--dl-grey-100)' : pressed ? 'var(--dl-grey-200)' : 'var(--dl-grey-100)',
        fg: disabled ? 'var(--dl-grey-600)' : 'var(--dl-black)',
        border: 'none'
      };
    case 'tertiary':
      return {
        bg: disabled ? 'var(--dl-white)' : pressed ? 'var(--dl-grey-100)' : 'var(--dl-white)',
        fg: disabled ? 'var(--dl-grey-500)' : 'var(--dl-black)',
        border: '1px solid var(--dl-grey-200)'
      };
    case 'ghost':
      return {
        bg: pressed ? 'var(--dl-grey-100)' : 'transparent',
        fg: disabled ? 'var(--dl-grey-500)' : 'var(--dl-black)',
        border: 'none'
      };
    default:
      return {
        bg: disabled ? 'var(--dl-grey-100)' : pressed ? 'var(--dl-grey-700)' : 'var(--dl-black)',
        fg: disabled ? 'var(--dl-grey-600)' : 'var(--dl-white)',
        border: 'none'
      };
  }
}
function DlButtonIcon({
  icon,
  onClick,
  type = 'primary',
  size = 'lg',
  state = 'default'
}) {
  const [gesturePressed, setGesturePressed] = useState(false);
  const disabled = state === 'disabled' || !onClick;
  const pressed = state === 'pressed' || state === 'default' && gesturePressed;
  const c = colorsFor(type, disabled, pressed);
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    onMouseDown: disabled ? undefined : () => setGesturePressed(true),
    onMouseUp: disabled ? undefined : () => setGesturePressed(false),
    onMouseLeave: disabled ? undefined : () => setGesturePressed(false),
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: HEIGHTS[size],
      height: HEIGHTS[size],
      padding: PADDINGS[size],
      background: c.bg,
      color: c.fg,
      border: c.border,
      borderRadius: 'var(--dl-radius-md)',
      cursor: disabled ? 'default' : 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: c.fg
    }
  }, icon));
}
Object.assign(__ds_scope, { DlButtonIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/DlButtonIcon.jsx", error: String((e && e.message) || e) }); }

// components/content/DlCard.jsx
try { (() => {
const {
  useState
} = React;
function DlCard({
  icon,
  title,
  description,
  enableActiveState = false,
  state = 'default',
  size = 'md'
}) {
  const [pressed, setPressed] = useState(false);
  const [active, setActive] = useState(false);
  const disabled = state === 'disabled';
  const contentColor = disabled ? 'var(--dl-grey-500)' : 'var(--dl-black)';
  const pad = size === 'lg' ? 16 : 12;
  const gap = size === 'lg' ? 16 : 12;
  return /*#__PURE__*/React.createElement("div", {
    onClick: disabled ? undefined : () => enableActiveState && setActive(a => !a),
    onMouseDown: disabled ? undefined : () => setPressed(true),
    onMouseUp: disabled ? undefined : () => setPressed(false),
    onMouseLeave: disabled ? undefined : () => setPressed(false),
    style: {
      display: 'flex',
      flexDirection: size === 'lg' ? 'column' : 'row',
      alignItems: size === 'lg' ? 'flex-start' : 'center',
      gap,
      padding: pad,
      background: pressed ? 'var(--dl-grey-200)' : 'var(--dl-grey-100)',
      borderRadius: 'var(--dl-radius-lg)',
      border: `2px solid ${active && !disabled ? 'var(--dl-black)' : 'transparent'}`,
      cursor: disabled ? 'default' : enableActiveState ? 'pointer' : 'default'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: contentColor,
      display: 'inline-flex'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dl-font-sans)',
      fontSize: 'var(--dl-font-size-2)',
      fontWeight: 'var(--dl-weight-semibold)',
      color: contentColor,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dl-font-sans)',
      fontSize: 'var(--dl-font-size-2)',
      color: contentColor,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, description) : null));
}
Object.assign(__ds_scope, { DlCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/DlCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/DlBadge.jsx
try { (() => {
function DlBadge({
  size = 'md',
  value = '1'
}) {
  if (size === 'sm') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: 'var(--dl-radius-full)',
        background: 'var(--dl-red-500)'
      }
    });
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 16,
      height: 16,
      padding: '0 4px',
      borderRadius: 'var(--dl-radius-full)',
      background: 'var(--dl-red-500)',
      color: 'var(--dl-white)',
      fontFamily: 'var(--dl-font-sans)',
      fontSize: 'var(--dl-font-size-1)',
      fontWeight: 'var(--dl-weight-semibold)',
      lineHeight: 1,
      whiteSpace: 'nowrap'
    }
  }, value);
}
Object.assign(__ds_scope, { DlBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/DlBadge.jsx", error: String((e && e.message) || e) }); }

// components/forms/DlInput.jsx
try { (() => {
const {
  useState
} = React;
const HPAD = {
  lg: 16,
  mg: 16,
  sm: 12
};
const VPAD_DEFAULT = {
  lg: 16,
  mg: 12,
  sm: 8
};
const VPAD_STACKED = {
  lg: 8,
  mg: 4,
  sm: 0
};
function DlInput({
  placeholder,
  iconLeft,
  iconRight,
  value,
  onChange,
  type = 'default',
  size = 'lg',
  enabled = true,
  errorHelperText
}) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const current = value !== undefined ? value : internalValue;
  const filled = !!current;
  const stacked = focused || filled;
  const isError = type === 'error';
  const isSuccess = type === 'success';
  const placeholderColor = !enabled ? 'var(--dl-grey-300)' : isError ? 'var(--dl-red-500)' : isSuccess ? 'var(--dl-green-500)' : 'var(--dl-grey-500)';
  const rightIcon = isError ? /*#__PURE__*/React.createElement("img", {
    src: "assets/icons/circle-alert.svg",
    width: 20,
    height: 20,
    alt: ""
  }) : isSuccess ? /*#__PURE__*/React.createElement("img", {
    src: "assets/icons/circle-check.svg",
    width: 20,
    height: 20,
    alt: ""
  }) : iconRight;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
      padding: `${stacked ? VPAD_STACKED[size] : VPAD_DEFAULT[size]}px ${HPAD[size]}px`,
      background: 'var(--dl-grey-100)',
      borderRadius: 'var(--dl-radius-md)',
      border: `2px solid ${focused ? 'var(--dl-black)' : 'transparent'}`
    },
    onClick: e => e.currentTarget.querySelector('input')?.focus()
  }, iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: 16,
      color: 'var(--dl-grey-500)',
      display: 'inline-flex'
    }
  }, iconLeft) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, stacked ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dl-font-sans)',
      fontSize: 'var(--dl-font-size-1)',
      color: placeholderColor,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, placeholder) : null, /*#__PURE__*/React.createElement("input", {
    value: current,
    disabled: !enabled,
    placeholder: stacked ? '' : placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: e => {
      if (value === undefined) setInternalValue(e.target.value);
      onChange?.(e.target.value);
    },
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      width: '100%',
      fontFamily: 'var(--dl-font-sans)',
      fontSize: 'var(--dl-font-size-3)',
      color: 'var(--dl-black)'
    }
  })), rightIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 16,
      color: 'var(--dl-grey-500)',
      display: 'inline-flex'
    }
  }, rightIcon) : null), isError ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 8,
      fontFamily: 'var(--dl-font-sans)',
      fontSize: 'var(--dl-font-size-2)',
      fontWeight: 'var(--dl-weight-medium)',
      color: 'var(--dl-red-500)'
    }
  }, errorHelperText || 'Error helper text') : null);
}
Object.assign(__ds_scope, { DlInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DlInput.jsx", error: String((e && e.message) || e) }); }

// components/layout/DlSeparator.jsx
try { (() => {
function DlSeparator({
  orientation = 'horizontal'
}) {
  return orientation === 'horizontal' ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 1,
      background: 'var(--dl-grey-200)'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: '100%',
      background: 'var(--dl-grey-200)'
    }
  });
}
Object.assign(__ds_scope, { DlSeparator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/DlSeparator.jsx", error: String((e && e.message) || e) }); }

// components/navigation/DlBottomNavigation.jsx
try { (() => {
const {
  useState
} = React;
function DlBottomNavigation({
  tabs,
  onTabChange,
  showSeparator = true,
  selectedIndex
}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const controlled = selectedIndex !== undefined;
  const activeIndex = controlled ? selectedIndex : internalIndex;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      background: 'var(--dl-white)'
    }
  }, showSeparator ? /*#__PURE__*/React.createElement(__ds_scope.DlSeparator, null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, tabs.map((tab, i) => {
    const isActive = i === activeIndex;
    const color = isActive ? 'var(--dl-black)' : 'var(--dl-grey-400)';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => {
        if (!controlled) setInternalIndex(i);
        onTabChange?.(i);
      },
      style: {
        flex: 1,
        height: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: 24,
        height: 24,
        color
      }
    }, tab.icon, tab.badge ? /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: -4,
        right: -8
      }
    }, tab.badge) : null), tab.text ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--dl-font-sans)',
        fontSize: 'var(--dl-font-size-1)',
        fontWeight: 'var(--dl-weight-bold)',
        color,
        whiteSpace: 'nowrap'
      }
    }, tab.text) : null);
  })));
}
Object.assign(__ds_scope, { DlBottomNavigation });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/DlBottomNavigation.jsx", error: String((e && e.message) || e) }); }

// components/navigation/DlTopNavigation.jsx
try { (() => {
function DlTopNavigation({
  title,
  showSeparator = true,
  size = 'md',
  iconLeft,
  iconRight,
  onIconLeftClick,
  onIconRightClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      background: 'var(--dl-white)'
    }
  }, size === 'md' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconBox, {
    icon: iconLeft,
    onClick: onIconLeftClick
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      margin: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      textAlign: 'center',
      fontFamily: 'var(--dl-font-sans)',
      fontSize: 'var(--dl-font-size-3)',
      fontWeight: 'var(--dl-weight-semibold)',
      color: 'var(--dl-black)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title)), /*#__PURE__*/React.createElement(IconBox, {
    icon: iconRight,
    onClick: onIconRightClick
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '0 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--dl-font-sans)',
      fontSize: 'var(--dl-font-size-8)',
      fontWeight: 'var(--dl-weight-bold)',
      color: 'var(--dl-black)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title)), /*#__PURE__*/React.createElement(IconBox, {
    icon: iconLeft,
    onClick: onIconLeftClick
  }), /*#__PURE__*/React.createElement(IconBox, {
    icon: iconRight,
    onClick: onIconRightClick
  })), showSeparator ? /*#__PURE__*/React.createElement(__ds_scope.DlSeparator, null) : null);
}
function IconBox({
  icon,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      width: 56,
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--dl-black)',
      cursor: onClick ? 'pointer' : 'default'
    }
  }, icon);
}
Object.assign(__ds_scope, { DlTopNavigation });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/DlTopNavigation.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DlButton = __ds_scope.DlButton;

__ds_ns.DlButtonDock = __ds_scope.DlButtonDock;

__ds_ns.DlButtonIcon = __ds_scope.DlButtonIcon;

__ds_ns.DlCard = __ds_scope.DlCard;

__ds_ns.DlBadge = __ds_scope.DlBadge;

__ds_ns.DlInput = __ds_scope.DlInput;

__ds_ns.DlSeparator = __ds_scope.DlSeparator;

__ds_ns.DlBottomNavigation = __ds_scope.DlBottomNavigation;

__ds_ns.DlTopNavigation = __ds_scope.DlTopNavigation;

})();
