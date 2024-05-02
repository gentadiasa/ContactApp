// contactsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/store';
import axios from 'axios';
import { ApiResponse, Contact, ListContact } from '../types/types';
import { Alert } from 'react-native';

interface ContactsState {
    contacts: ListContact[];
    loading: boolean;
    error: string | null;
}

const initialState: ContactsState = {
    contacts: [],
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        fetchContactsSuccess(state, action: PayloadAction<ListContact[]>) {
            state.loading = false;
            state.contacts = action.payload;
        },
        addContact(state, action: PayloadAction<ListContact>) {
            state.contacts.push(action.payload);
        },
    },
});

export const {
    setLoading,
    fetchContactsSuccess,
    addContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;

export const fetchContacts = (): AppThunk => async dispatch => {
    console.log('fetchContacts')
    dispatch(setLoading(true));
    try {
        const response = await axios.get<ApiResponse>(
            'https://contact.herokuapp.com/contact'
        );
        dispatch(setLoading(false));
        let data = response.data.data;

        const grouped: Record<string, Contact[]> = data.sort().reduce((groupedRows: Record<string, Contact[]>, row: Contact) => {
            const firstLetter = row.firstName.slice(0, 1);
            return {
                ...groupedRows,
                [firstLetter]: [...(groupedRows[firstLetter] || []), row]
            };
        }, {});
        
        const ordered: Record<string, Contact[]> = Object.keys(grouped).sort().reduce((obj: Record<string, Contact[]>, key: string) => {
            obj[key] = grouped[key];
            return obj;
        }, {});
        
        const list: ListContact[] = Object.entries(ordered).map(a => {
            return { label: a[0], data: [...a[1]] };
        });
        dispatch(fetchContactsSuccess(list));
        console.log(response.data.data.length)
        console.log(list)
    } catch (error) {
        dispatch(setLoading(false));
        Alert.alert('Info', `${error}`)
    }
};

export const createContact = async (data:Contact | undefined) => {
    console.log(`create contacttt`, data)
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
        console.log(response)
        if(response.status == 201){
            Alert.alert('Info', `Create Contact Success`)
            return response
        }
    } catch (error) {
        Alert.alert('Info', `${error}`)
    }
};

export const updateContact = async (data:Contact | undefined) => {
    console.log(`update contact`, data)
    try {
        const response = await axios.put(
            `https://contact.herokuapp.com/contact/${data?.id}`,
            {
                "firstName": data?.firstName,
                "lastName": data?.lastName,
                "age": data?.age,
                "photo": data?.photo
            },
        );
        if(response.status == 201){
            Alert.alert('Info', `Edit Contact Success`)
            return response
        }
    } catch (error) {
        Alert.alert('Info', `${error}`)
    }
};

export const deleteContacts = (id:string | undefined): AppThunk => async dispatch => {
    console.log(`delete contact ${id}`)
    try {
        dispatch(setLoading(true));
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