import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import MatchCard from './MatchCard';


export default function LeagueSection({
  leagueName,
  leagueIcon,
  matches,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leagueInfo}>
          <Text style={styles.leagueIcon}>{leagueIcon}</Text>
          <Text style={styles.leagueName}>{leagueName}</Text>
        </View>
        <Link href="/league/premier-league">
          <Text style={styles.seeAll}>See All</Text>
        </Link>
      </View>
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#5C6B7A',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  leagueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leagueIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  leagueName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
