import { useKeepAwake } from 'expo-keep-awake';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, Vibration, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

export function Timer({ focusSubject, onTimerEnd, clearSubject }) {
	useKeepAwake();
	const [minutes, setMinutes] = useState(DEFAULT_TIME);
	const [isStarted, setIsStarted] = useState(false);
	const [progress, setprogress] = useState(1);

	const vibrate = () => {
		if (Platform.OS === 'ios') {
			const interval = setInterval(() => Vibration.vibrate(), 1000);
			setTimeout(() => clearInterval(interval), 10000);
		} else {
			Vibration.vibrate(10000);
		}
	};

	const onEnd = () => {
		vibrate();
		setMinutes(DEFAULT_TIME);
		setprogress(1);
		setIsStarted(false);
		onTimerEnd();
	};

	useEffect(() => {
		setprogress(1);
		setIsStarted(false);
	}, [minutes]);

	return (
		<View style={styles.container}>
			<View style={styles.countDownContainer}>
				<Countdown
					minutes={minutes}
					isPaused={!isStarted}
					onProgress={setprogress}
					onEnd={onEnd}
				/>
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Focusing on:</Text>
				<Text style={styles.task}>{focusSubject}</Text>
			</View>
			<ProgressBar
				progress={progress}
				color={colors.lightBlue}
				style={styles.progressBar}
			/>
			<View style={styles.buttonWraper}>
				<Timing changeTime={setMinutes} />
			</View>
			<View style={styles.buttonWraper}>
				<RoundedButton
					title={isStarted ? 'Pause' : 'Start'}
					onPress={() => setIsStarted(!isStarted)}
				/>
			</View>
			<View style={styles.clearSubject}>
				<RoundedButton title='-' size={50} onPress={clearSubject} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	countDownContainer: {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleContainer: {
		paddingTop: spacing.xxl,
		paddingBottom: spacing.md
	},
	title: {
		color: colors.white,
		textAlign: 'center'
	},
	task: {
		color: colors.white,
		textAlign: 'center',
		fontWeight: 'bold',
		paddingTop: spacing.sm
	},
	progressBar: {
		height: 20
	},
	clearSubject: {
		padding: spacing.lg
	},
	buttonWraper: {
		flex: 0.3,
		flexDirection: 'row',
		padding: spacing.md,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
