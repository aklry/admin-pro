import { defineStore } from 'pinia'
import store from '@/store'
import { ISettingType } from '@/store/setting/type'

const useSettingStoreHooks = defineStore('setting', {
  state: (): ISettingType => ({
    titles: [],
  }),
  actions: {
    setTitlesAction(titles: Array<string>) {
      this.titles = titles
    },
  },
})

export function useSettingStore() {
  return useSettingStoreHooks(store)
}
