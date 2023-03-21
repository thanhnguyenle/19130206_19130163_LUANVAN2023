import React from "react"
const Home =  React.lazy(() => import("../../src/components/views/home"))
const routes = [
    { path: '/', exact: true, name: 'Home',component: Home },
]
