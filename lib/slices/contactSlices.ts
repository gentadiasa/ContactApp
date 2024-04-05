// contactsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/store';
import axios from 'axios';
import { ApiResponse, Contact } from '../types/types';
import { Alert } from 'react-native';

interface ContactsState {
    contacts: Contact[];
    loading: boolean;
    error: string | null;
    selectedContactId: string | undefined;
}

const initialState: ContactsState = {
    contacts: [],
    loading: false,
    error: null,
    selectedContactId: '',
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        fetchContactsSuccess(state, action: PayloadAction<Contact[]>) {
            state.loading = false;
            state.contacts = action.payload;
        },
        addContact(state, action: PayloadAction<Contact>) {
            state.contacts.push(action.payload);
        },
        selectContact(state, action: PayloadAction<string | undefined>) {
            state.selectedContactId = action.payload;
        },
    },
});

export const {
    setLoading,
    fetchContactsSuccess,
    addContact,
    selectContact
} = contactsSlice.actions;

export default contactsSlice.reducer;

export const fetchContacts = (): AppThunk => async dispatch => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get<ApiResponse>(
            'https://contact.herokuapp.com/contact'
        );
        dispatch(setLoading(false));
        dispatch(fetchContactsSuccess(response.data.data as Contact[]));
        console.log(response.data.data.length)
    } catch (error) {
        dispatch(setLoading(false));
        Alert.alert('Info', `${error}`)
    }
};

export const createContact = (data:Contact | undefined): AppThunk => async dispatch => {
    console.log(`create contacttt`, data)
    dispatch(setLoading(true));
    try {
        const response = await axios.post(
            `https://contact.herokuapp.com/contact`,
            {
                "firstName": data?.firstName,
                "lastName": data?.lastName,
                "age": data?.age,
                "photo": data?.photo
            },
            {headers: {"Content-Type": "application/json", Accept: "application/json"}}
        );
        console.log('pppp')
        console.log(response)
        dispatch(setLoading(false));
        if(response.status == 201){
            Alert.alert('Info', `Create Contact Success`)
            return true
        }
    } catch (error) {
        dispatch(setLoading(false));
        Alert.alert('Info', `${error}`)
    }
};

export const updateContact = (id?:string): AppThunk => async dispatch => {
    console.log(`update contact ${id}`)
    dispatch(setLoading(true));
    try {
        const response = await axios.put(
            `https://contact.herokuapp.com/contact/${id}`
        );
        dispatch(setLoading(false));
        console.log(response)
        if(response.status == 201){
            Alert.alert('Info', `Edit Contact Success`)
            // fetchContacts()
            return true
        }
    } catch (error) {
        dispatch(setLoading(false));
        Alert.alert('Info', `${error}`)
    }
};

export const deleteContacts = (id:string | undefined): AppThunk => async dispatch => {
    console.log(`delete contact ${id}`)
    dispatch(setLoading(true));
    try {
        const response = await axios.delete(
            `https://contact.herokuapp.com/contact/${id}`
        );
        dispatch(setLoading(false));
        console.log(response)
        if(response.status == 201){
            Alert.alert('Info', `Delete Contact Success`)
            fetchContacts()
        }
    } catch (error) {
        dispatch(setLoading(false));
        Alert.alert('Info', `${error}`)
    }
};

