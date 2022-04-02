import { createLocalVue, mount } from '@vue/test-utils'
import NotFound from '@/components/NotFound'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const localVue = createLocalVue()
localVue.use(Element)

describe('NotFound.vue', () => {
    it('renders props.msg when passed', () => {
        const wrapper = mount(NotFound, { localVue })
        console.log(wrapper.html())
        expect('').toMatch('')
    })
})
