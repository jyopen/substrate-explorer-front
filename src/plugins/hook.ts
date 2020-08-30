import Vue from 'vue';
import {hooks} from 'vue-hooks';
import VueCompositionApi from '@vue/composition-api';

Vue.use(hooks);
Vue.use(VueCompositionApi);


declare module '@vue/composition-api/dist/component/component' {
    interface SetupContext {
        readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
    }
}
