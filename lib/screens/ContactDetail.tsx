// src/components/ContactDetail.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../store/store';
import { RootStackParamList, StackNavigation } from '../router/router';
import { rHeight, rWidth } from '../constants/variables';
import { deleteContacts } from '../slices/contactSlices';
import Icon from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../components/loader';

const ContactDetail: React.FC = () => {
    const navigation = useNavigation<StackNavigation>();
    const {params} = useRoute<ContactDetailRouteProp>();
    const state = useSelector((state: RootState) => state.contacts);
    type ContactDetailRouteProp = RouteProp<RootStackParamList, 'ContactDetail'>;

    const dispatch = useDispatch<any>();

    const handleDelete = async () => {
        await dispatch(deleteContacts(params.data.id));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            <View>
                <ImageBackground source={{ uri: params.data.photo }} style={{ width: rWidth(100), height: rHeight(40)}} imageStyle={{resizeMode:'cover'}}>
                    <TouchableOpacity
                        style={{
                            position:'absolute', top: 10, left:10,
                            backgroundColor: 'rgba(194,197,204,0.5)',
                            borderRadius: 20,
                            padding: 9
                        }}
                        onPress={()=>navigation.goBack()}
                    >
                        <Icon
                            color="white"
                            name="chevron-thin-left"
                            size={rHeight(2.5)}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            position:'absolute', top: 10, right:10,
                            backgroundColor: 'rgba(194,197,204,0.5)',
                            borderRadius: 20,
                            padding: 9
                        }}
                        onPress={() => navigation.navigate('AddContact', {data: params.data})}
                    >
                        <Icon
                            color="lightblue"
                            name="edit"
                            size={rHeight(2.5)}
                        />
                    </TouchableOpacity>

                    <Text style={styles.title}>{params.data.firstName} {params.data.lastName}</Text>
                    <Text style={{ ...styles.title, bottom: 5, fontSize: 25}}>{`(${params.data.age})`}</Text>
                </ImageBackground>
                
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                <TouchableOpacity
                    onPress={handleDelete}
                    style={{ ...styles.container, backgroundColor: 'red', justifyContent: 'center', borderRadius: 10, flexDirection: 'row', width: rWidth(80), alignItems:'center'}}
                >
                    <Text style={{ ...styles.text, color: 'white', fontWeight: 'bold' }}>Delete Contact </Text>
                    <Icon
                        color="white"
                        name="trash"
                        size={rHeight(2.5)}
                    />
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: "#000",
        borderRadius: 20,
        maxHeight: 500,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: rHeight(3)
    },
    text: {
        fontSize: 17,
        color: 'black',
    },
    title: {
        fontSize: 30,
        color: 'white',
        paddingLeft: 15,
        paddingBottom: 5,
        textShadowColor:'#585858',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10,
        textAlign: 'center',
        bottom: rHeight(4),
        position:'absolute'
    }
})

export default ContactDetail;
