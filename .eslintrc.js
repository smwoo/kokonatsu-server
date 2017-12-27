module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "import/newline-after-import": ["error", { "count": 2 }],
    "jsx-a11y/label-has-for": "off",
    "no-shadow": "off",
    "max-len": ["error", {"code": 100, "tabWidth": 2, "ignoreStrings": false, "ignoreTemplateLiterals": false,}],
    "no-param-reassign": ["error", { "props": false }],
    "indent": ["error", 2],
    "func-names": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-restricted-syntax": "off",
  }
};
