// ContactList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchContacts } from '../slices/contactSlices';
import { RootState } from '../store/store';
import { StackNavigation } from '../router/router';
import axios from 'axios';
import { ApiResponse, Contact } from '../types/types';
import { rHeight, rWidth } from '../constants/variables';

const ContactList: React.FC = () => {
    const navigation = useNavigation<StackNavigation>();
    const dispatch = useDispatch<any>();
    const state = useSelector((state: RootState) => state.contacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, []);

    const handleContactPress = (contact: Contact) => {
        navigation.navigate('ContactDetail', {data: contact});
    };

    return (
        <View style={{flex:1,backgroundColor: 'white',}}>
            <TouchableOpacity
                    onPress={() => navigation.navigate('AddContact')}
                    style={{ position: 'absolute', top: -rHeight(2), right: rHeight(3) }}
                >
                <Text style={{...styles.header, color:'lightblue', fontWeight:'200', fontSize: 50}}>+</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <Text style={styles.header}>Contacts</Text>
            </View>
            
            
            <View style={styles.listContainer}>
            {state.loading && <ActivityIndicator size={50} color={'lightblue'}/>}
            <FlatList
                data={[...state.contacts,]}
                style={{
                    paddingHorizontal: rWidth(2)
                }}
                renderItem={({ item }) => (
                    <>
                    <Text style={styles.label}>{item.label?.toUpperCase()}</Text>
                    
                    {item.data.map(e => 
                        <>
                        <TouchableOpacity onPress={() => handleContactPress(e)} style={styles.itemContainer}>
                            <View style={{flexDirection:'row'}}>
                            <Image source={{ uri: e.photo }} style={{ width: rHeight(7), height: rHeight(7), borderRadius: 10 }} />
                            <View style={{ marginStart: 10 }}>
                                <Text style={styles.text}>{e.firstName} {e.lastName}</Text>
                                <Text style={styles.text}>Age: {e.age}</Text>
                            </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 1, width: '100%', backgroundColor: 'lightgray' }} />
                        </>
                    )}
                    </>
                )}
                keyExtractor={item => `${item.label}`}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginTop: rHeight(3),
        marginStart: rWidth(5)
    },
    listContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 20,
        alignItems: 'center',
        maxHeight: 500,
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
        marginTop: rHeight(1)
    },
    text: {
        fontSize: 18,
        color: 'black',
    }
})

export default ContactList;
