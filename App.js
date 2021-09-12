import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const TASK_STATUSES = {
	COMPLETE: 1,
	CANCELLED: 2
};

export default function App() {
	const [focusSubject, setFocusSubject] = useState(null);
	const [focusHistory, setFocusHistory] = useState([]);

	const addFocusHistorySubjectWithStatus = (subject, status) => {
		setFocusHistory([
			...focusHistory,
			{ subject, status, key: focusHistory.length + 1 }
		]);
	};

	const onClear = () => {
		setFocusHistory([]);
	};

	const saveFocusHistory = async () => {
		try {
			await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
		} catch (e) {
			console.error(e);
		}
	};

	const loadFocusHistory = async () => {
		try {
			const history = await AsyncStorage.getItem('focusHistory');
			if (history && JSON.parse(history).length)
				setFocusHistory(JSON.parse(history));
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		loadFocusHistory();
	}, []);

	useEffect(() => {
		saveFocusHistory();
		/* eslint-disable-next-line */
	}, [focusHistory]);

	return (
		<View style={styles.container}>
			{focusSubject ? (
				<Timer
					focusSubject={focusSubject}
					onTimerEnd={() => {
						addFocusHistorySubjectWithStatus(
							focusSubject,
							TASK_STATUSES.COMPLETE
						);
						setFocusSubject(null);
					}}
					clearSubject={() => {
						addFocusHistorySubjectWithStatus(
							focusSubject,
							TASK_STATUSES.CANCELLED
						);
						setFocusSubject(null);
					}}
				/>
			) : (
				<>
					<Focus addSubject={setFocusSubject} />
					{!!focusHistory.length && (
						<FocusHistory focusHistory={focusHistory} onClear={onClear} />
					)}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
		backgroundColor: colors.darkBlue
	}
});
