module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // VisionCamera frame processors (worklets-core ≠ Reanimated 4)
      ["react-native-worklets-core/plugin"],
      // Reanimated 4 — debe ir al final
      ["react-native-worklets/plugin"],
    ],
  };
};
