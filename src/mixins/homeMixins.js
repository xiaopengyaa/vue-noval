import { mapMutations } from 'vuex'

export default {
  activated() {
    this.SET_BASE_ROUTE_NAME(this.$route.name)
  },
  methods: {
    ...mapMutations('base', ['SET_BASE_ROUTE_NAME'])
  }
}
