import { writable } from 'svelte/store';

const page = writable(0)
const nameS = writable("")
const familyS = writable("")
const phoneS = writable("")
const emailS = writable("")

export {page , emailS , nameS,familyS , phoneS}