import { ElButton, ElMessageBox } from 'element-plus';

const components = [ElButton];
const plugins = [ElMessageBox];

export const importUI = (app) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });

  plugins.forEach((plugin) => {
    app.use(plugin);
  });
};
