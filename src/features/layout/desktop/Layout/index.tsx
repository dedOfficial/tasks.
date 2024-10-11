import { ComponentChildren, FunctionComponent } from 'preact';
import { ProLayout } from '@ant-design/pro-components';
import { FontColorsOutlined } from '@ant-design/icons';
import { useLocation } from 'preact-iso';

const Layout: FunctionComponent<{ children: ComponentChildren }> = ({ children }) => {
    const { route } = useLocation();

    return (
        <ProLayout
            title={'Tasks'}
            logo={<FontColorsOutlined />}
            // pure={false}
            // loading={false}
            // menuHeaderRender={() => <></>}
            menuFooterRender={() => <span>v0.0.1</span>}
            onMenuHeaderClick={() => route('/tasks')}
        >
            {children}
        </ProLayout>
    );
};

export default Layout;
