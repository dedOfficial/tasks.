import { FunctionComponent } from 'preact';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Result } from 'antd';
import { useLocation } from 'preact-iso';

const NotFoundPage: FunctionComponent = () => {
    const { route } = useLocation();

    return (
        <PageContainer
            title={'Not Found'}
            content={
                <Result
                    status='404'
                    title='404'
                    subTitle='Sorry, the page you visited does not exist.'
                    extra={
                        <Button type='primary' onClick={() => route('/')}>
                            Back Home
                        </Button>
                    }
                />
            }
            // tabList={[
            //     {
            //         tab: 'base information',
            //         key: 'base',
            //     },
            //     {
            //         tab: 'details',
            //         key: 'info',
            //     },
            // ]}
            // extra={[
            //     <Button key='3'>Operation</Button>,
            //     <Button key='2'>Operation</Button>,
            //     <Button key='1' type='primary'>
            //         Primary Action
            //     </Button>,
            // ]}
            // footer={[
            //     <Button key='rest'>Reset</Button>,
            //     <Button key='submit' type='primary'>
            //         submit
            //     </Button>,
            // ]}
        ></PageContainer>
    );
};

export default NotFoundPage;
