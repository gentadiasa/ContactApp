// ContactList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchContacts, selectContact } from '../slices/contactSlices';
import { RootState } from '../store/store';
import { StackNavigation } from '../router/router';
import axios from 'axios';
import { ApiResponse, Contact } from '../types/types';
import { rHeight } from '../constants/variables';

const ContactList: React.FC = () => {
    const navigation = useNavigation<StackNavigation>();
    const dispatch = useDispatch<any>();
    const state = useSelector((state: RootState) => state.contacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, []);

    const handleContactPress = (contactId?: string) => {
        dispatch(selectContact(contactId));
        navigation.navigate('ContactDetail');
    };

    return (
        <View style={{flex:1,backgroundColor: 'maroon',}}>
            <Text style={styles.header}>Contact App</Text>
            <View style={styles.listContainer}>

            <TouchableOpacity
                onPress={() => navigation.navigate('AddContact')}
                style={{...styles.itemContainer, backgroundColor: 'orange', justifyContent:'center', borderRadius: 10}}
            >
                <Text style={{...styles.text, color:'white', fontWeight: 'bold' }}>Add New Contact</Text>
            </TouchableOpacity>
            {state.loading ? <ActivityIndicator size={50} color={'white'}/>
            : <FlatList
                data={state.contacts}
                style={{maxHeight: rHeight(84)}}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleContactPress(item.id)} style={styles.itemContainer}>
                        <Image source={{uri: item.photo}} style={{width: rHeight(7), height: rHeight(7), borderRadius: 50}}/>
                        <View style={{marginStart: 10}}>
                            <Text style={styles.text}>{item.firstName} {item.lastName}</Text>
                            <Text style={styles.text}>Age: {item.age}</Text>
                        </View>          
                    </TouchableOpacity>
                )}
                keyExtractor={item => `${item.id}`}
            />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: rHeight(3)
    },
    listContainer: {
        padding: 10,
        // backgroundColor: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
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
    text: {
        fontSize: 18,
        color: 'black',
    }
})

export default ContactList;
