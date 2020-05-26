import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import MaterialIcon from '@/components/MaterialIcon'

function missingMaterialIcons(ids) {
    const icons = {}
    for (const id of ids) {
      for (const suffix of ['fill', 'outline', 'two-tone', 'round', 'sharp']) {
        const name = `${id}_${suffix}`
        icons[name] = {
          component: MaterialIcon,
          props: {
            name
          }
        }
      }
    }
    return icons
  }

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#9f1418"
            }
        },
    },
    icons: {
        iconfont: 'md',
        ...missingMaterialIcons(['visibility', 'visibility_off'])
    },
});
