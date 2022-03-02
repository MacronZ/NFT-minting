import videos from '../components/Dashboard/components/Widgets/videos';
import videoOptions from '../utils/videoOptions';

function filter(language, size, theme) {
  let filtered = videos;
  if (language !== 0) {
    const option = videoOptions.languageOptions.find((l) => l.key === language);
    if (option) {
      filtered = filtered.filter((v) => v.language === option.name);
    }
  }
  if (size !== 0) {
    const option = videoOptions.sizeOptions.find((it) => it.key === size);
    if (option) {
      filtered = filtered.filter((it) => it.size === option.name);
    }
  }
  if (theme !== 0) {
    const option = videoOptions.themeOptions.find((it) => it.key === theme);
    if (option) {
      filtered = filtered.filter((it) => it.theme === option.name);
    }
  }
  return filtered;
}

export default { filter };
