import { ComponentChildren, FunctionComponent } from 'preact';
import {
    enUSIntl,
    ProConfigProvider,
    ProLayout,
    ProSettings,
    // ruRUIntl,
    SettingDrawer,
} from '@ant-design/pro-components';
import {
    CheckSquareOutlined,
    FileAddFilled,
    FontColorsOutlined,
    GithubFilled,
    InfoCircleFilled,
    QuestionCircleFilled,
    TeamOutlined,
} from '@ant-design/icons';
import { useLocation } from 'preact-iso';
import { useState } from 'preact/hooks';
import { ConfigProvider } from 'antd';
// import ruRu from 'antd/locale/ru_RU';
import enUS from 'antd/locale/en_US';

const Layout: FunctionComponent<{ children: ComponentChildren }> = ({ children }) => {
    const { path, route } = useLocation();

    // const actionRef = useRef<{
    //     reload: () => void;
    // }>();

    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>();

    return (
        <ProConfigProvider intl={enUSIntl} hashed={false}>
            <ConfigProvider
                locale={enUS}
                getTargetContainer={() => {
                    return document.getElementById('app') || document.body;
                }}
            >
                <ProLayout
                    title={'tasks.'}
                    logo={<FontColorsOutlined />}
                    // pure={false}
                    // loading={false}
                    // location={window.location}
                    // menuHeaderRender={() => <></>}
                    menuFooterRender={() => <span>v0.0.1</span>}
                    onMenuHeaderClick={() => route('/')}
                    // menuExtraRender={() => <></>}
                    // onTopMixMenuHeaderClick={() => {}} // ???
                    // contentStyle={{ background: 'red' }}
                    layout={'side'} // layout menu mode
                    contentWidth={'Fluid'}
                    fixedHeader={true}
                    // fixSiderbar={false}
                    breakpoint={'lg'} // triggers for resonsive layout
                    // actionRef={actionRef} // actions ref. for loading from server maybe
                    menu={{
                        locale: true,
                        defaultOpenAll: true,
                        // request: async () => {
                        //     return [];
                        // }, // fetch menu from server
                    }}
                    // iconfontUrl={} // config for iconfont (URL)
                    iconPrefixes={'icon-'} // icon prefix of side menu, class name
                    locale={'en-US'}
                    // locale={'ru-RU'}
                    // settings={settings} // настройки layout
                    siderWidth={200}
                    // suppressSiderWhenMenuEmpty={true} // hide side then menu is empty
                    defaultCollapsed={true}
                    // collapsed={false} // Controls the collapse and expansion of the menu
                    // onCollapse={() => {}}
                    onPageChange={(location) => {
                        console.log(location);
                    }}
                    headerRender={() => {
                        return <> </>;
                    }} // Custom header render method
                    // headerTitleRender={() => {}} // Custom header title method, works in mix mode and top mode
                    // headerContentRender={() => {}} // Custom header content methods
                    // collapsedButtonRender={() => {}} // Custom method for collapsed button
                    // footerRender={() => {}} // Custom render method for footer
                    // pageTitleRender={() => {}} // The render method for custom page titles
                    // menuRender={() => {}} // The render method for custom menus
                    // postMenuData={(menuData) => {
                    //     console.log(menuData);
                    //     return menuData ?? [];
                    // }} // View the menu data before displaying it, changes will not trigger a re-render
                    // menuItemRender={}
                    // subMenuItemRender={}
                    // menuDataRender={}
                    breadcrumbRender={(route) => route}
                    route={{
                        path: '/',
                        routes: [
                            {
                                path: '/tasks',
                                name: 'Tasks',
                                icon: <CheckSquareOutlined />,
                                // icon: <SmileFilled />,
                                // component: './Welcome',
                            },
                        ],
                    }}
                    location={{ pathname: path }}
                    disableMobile={false}
                    // ErrorBoundary={}
                    links={[<FileAddFilled />, <TeamOutlined />]}
                    menuProps={{
                        onClick: ({ key: path }) => route(path),
                    }}
                    // waterMarkProps={{ content: 'sdaasd' }}
                    actionsRender={(props) => {
                        if (props.isMobile) return [];
                        if (typeof window === 'undefined') return [];
                        return [
                            // props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                            //     <SearchInput />
                            // ) : undefined,
                            <InfoCircleFilled key='InfoCircleFilled' />,
                            <QuestionCircleFilled key='QuestionCircleFilled' />,
                            <GithubFilled key='GithubFilled' />,
                        ];
                    }}
                    {...settings}
                >
                    {children}

                    <SettingDrawer
                        pathname={path}
                        enableDarkTheme
                        getContainer={(e: Element) => {
                            if (typeof window === 'undefined') return e;
                            return document.getElementById('app');
                        }}
                        settings={settings}
                        onSettingChange={(changeSetting) => {
                            setSetting(changeSetting);
                        }}
                        disableUrlParams={true}
                    />
                </ProLayout>
            </ConfigProvider>
        </ProConfigProvider>
    );
};

export default Layout;
