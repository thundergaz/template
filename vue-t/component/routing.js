export const __module_name__Routing = [
    {
        path: "",
        redirect: "list"
    },
    // 需求列表
    {
        path: "list",
        name: 'list',
        component: () => import(
            "@/__module_path__/list"
        ),
        meta: { title: '列表' },
    },
];