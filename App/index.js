// Filename: index.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, ScrollView, Picker } from 'react-native';
import axios from 'axios';

const API_URL = 'http://dev.192.168.1.107.nip.io:3300/chatgpt';

const predefinedRecipients = ["Father", "Mother", "Brother", "Sister", "Friend", "Custom"];
const predefinedOccasions = ["Birthday", "Anniversary", "Graduation", "New Year", "Custom"];
const predefinedStyles = ["Formal", "Informal", "Funny", "Heartfelt", "Custom"];

export default function App() {
    const [recipient, setRecipient] = useState(predefinedRecipients[0]);
    const [customRecipient, setCustomRecipient] = useState('');
    const [occasion, setOccasion] = useState(predefinedOccasions[0]);
    const [customOccasion, setCustomOccasion] = useState('');
    const [style, setStyle] = useState(predefinedStyles[0]);
    const [customStyle, setCustomStyle] = useState('');
    const [greeting, setGreeting] = useState('');

    const generateGreeting = async () => {
        const finalRecipient = recipient === "Custom" ? customRecipient : recipient;
        const finalOccasion = occasion === "Custom" ? customOccasion : occasion;
        const finalStyle = style === "Custom" ? customStyle : style;

        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    { role: "user", content: `Create a greeting for ${finalRecipient} on the occasion of ${finalOccasion} in ${finalStyle} style.` }
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
                <Text style={styles.label}>Select Recipient</Text>
                <Picker selectedValue={recipient} style={styles.picker} onValueChange={(itemValue) => setRecipient(itemValue)}>
                    {predefinedRecipients.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                    ))}
                </Picker>
                {recipient === "Custom" && (
                    <TextInput
                        style={styles.input}
                        placeholder="Custom Recipient"
                        value={customRecipient}
                        onChangeText={setCustomRecipient}
                    />
                )}
                <Text style={styles.label}>Select Occasion</Text>
                <Picker selectedValue={occasion} style={styles.picker} onValueChange={(itemValue) => setOccasion(itemValue)}>
                    {predefinedOccasions.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                    ))}
                </Picker>
                {occasion === "Custom" && (
                    <TextInput
                        style={styles.input}
                        placeholder="Custom Occasion"
                        value={customOccasion}
                        onChangeText={setCustomOccasion}
                    />
                )}
                <Text style={styles.label}>Select Style</Text>
                <Picker selectedValue={style} style={styles.picker} onValueChange={(itemValue) => setStyle(itemValue)}>
                    {predefinedStyles.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                    ))}
                </Picker>
                {style === "Custom" && (
                    <TextInput
                        style={styles.input}
                        placeholder="Custom Style"
                        value={customStyle}
                        onChangeText={setCustomStyle}
                    />
                )}
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
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    picker: {
        width: '100%',
        height: 50,
        marginBottom: 10,
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