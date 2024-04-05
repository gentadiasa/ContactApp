import React from 'react';
import {
    View,
    Modal,
    ActivityIndicator
} from 'react-native';
import { rHeight } from '../constants/variables';

const Loader: React.FC = () =>
    (<Modal
        transparent
        visible={true}
    >
        <View
            style={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.4)',
            }}
        >

            <ActivityIndicator
                size={rHeight(10)}
                color={'maroon'}
                style={{ backgroundColor: 'white', borderRadius: 50 }}
            />
        </View>
    </Modal>
    );

export default Loader