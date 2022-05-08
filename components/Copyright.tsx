import * as React from 'react';

export default function Copyright() {
    return <>
        <div style={{
            marginLeft: 100,
            marginTop: 15,
            marginBottom: 20,
            fontSize: 5,
        }}>
            Copyright
            {'© '}
            {new Date().getFullYear()}&nbsp;
            Kuchen. All Rights Reserved
        </div>
    </>
}