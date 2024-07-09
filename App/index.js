// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import axios from 'axios';

const API_URL = 'http://dev.192.168.1.107.nip.io:3300/chatgpt';

export default function App() {
    const [recipient, setRecipient] = useState('');
    const [occasion, setOccasion] = useState('');
    const [style, setStyle] = useState('');
    const [greeting, setGreeting] = useState('');

    const generateGreeting = async () => {
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    { role: "user", content: `Create a greeting for ${recipient} on the occasion of ${occasion} in ${style} style.` }
                ],
                model: "gpt-4o"
            });

            const { data } = response;
            setGreeting(data.response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Greeting Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Recipient"
                    value={recipient}
                    onChangeText={setRecipient}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Occasion"
                    value={occasion}
                    onChangeText={setOccasion}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Style"
                    value={style}
                    onChangeText={setStyle}
                />
                <Button title="Generate Greeting" onPress={generateGreeting} />
                {greeting ? (
                    <View style={styles.greetingBox}>
                        <Text style={styles.greetingText}>{greeting}</Text>
                    </View>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        marginBottom: 10,
    },
    greetingBox: {
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    greetingText: {
        fontSize: 16,
    },
});