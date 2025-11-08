import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertCircle, ChevronLeft, Clock, Zap } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import LoadingSpinner from '../../components/LoadingSpinner';
import { dummyMatches, streamMatches } from '../../data/dummyData';

export default function MatchDetailsScreen() {
    const { id } = useLocalSearchParams();
//   const { matchId } = useLocalSearchParams();
// Since you're using `/match/${match.id}`, the parameter is 'id'
  const matchId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const allMatches = [...dummyMatches, ...streamMatches];
  const match = allMatches.find((m) => m.id === matchId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!match) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.title}>Match Details</Text>
          <View style={{ width: 28 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Match not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.title}>Match Details</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.matchHeader}>
        <View style={styles.teamSection}>
          <Text style={styles.teamLogo}>{match.homeTeam.logo}</Text>
          <Text style={styles.teamName}>{match.homeTeam.name}</Text>
        </View>

        <View style={styles.scoreSection}>
          <Text style={styles.score}>
            {match.homeScore} - {match.awayScore}
          </Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{match.status}</Text>
          </View>
          <Text style={styles.league}>{match.leagueName}</Text>
        </View>

        <View style={styles.teamSection}>
          <Text style={styles.teamLogo}>{match.awayTeam.logo}</Text>
          <Text style={styles.teamName}>{match.awayTeam.name}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {(['stats', 'events', 'lineups', 'h2h']).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'stats' && <StatsTab match={match} />}
        {activeTab === 'events' && <EventsTab match={match} />}
        {activeTab === 'lineups' && <LineupsTab match={match} />}
        {activeTab === 'h2h' && <H2HTab />}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

function StatsTab({ match }) {
  if (!match.stats) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Stats not available yet</Text>
      </View>
    );
  }

  const stats = [
    { label: 'Possession', home: match.stats.possession.home, away: match.stats.possession.away, unit: '%' },
    { label: 'Shots', home: match.stats.shots.home, away: match.stats.shots.away, unit: '' },
    { label: 'Shots on Target', home: match.stats.shotsOnTarget.home, away: match.stats.shotsOnTarget.away, unit: '' },
    { label: 'Fouls', home: match.stats.fouls.home, away: match.stats.fouls.away, unit: '' },
    { label: 'Corners', home: match.stats.corners.home, away: match.stats.corners.away, unit: '' },
    { label: 'Offsides', home: match.stats.offside.home, away: match.stats.offside.away, unit: '' },
    { label: 'Passes', home: match.stats.passes.home, away: match.stats.passes.away, unit: '' },
    { label: 'Tackles', home: match.stats.tackles.home, away: match.stats.tackles.away, unit: '' },
  ];

  return (
    <View style={styles.tabContent}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statRow}>
          <View style={styles.statValue}>
            <Text style={styles.statNumber}>{stat.home}{stat.unit}</Text>
          </View>
          <Text style={styles.statLabel}>{stat.label}</Text>
          <View style={styles.statValue}>
            <Text style={styles.statNumber}>{stat.away}{stat.unit}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function EventsTab({ match }) {
  if (!match.events || match.events.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No events yet</Text>
      </View>
    );
  }

  const getEventIcon = (type) => {
    switch (type) {
      case 'goal':
        return <Zap size={20} color="#10B981" />;
      case 'card':
        return <AlertCircle size={20} color="#EF4444" />;
      case 'substitution':
        return <Clock size={20} color="#3B82F6" />;
      default:
        return <Clock size={20} color="#6B7280" />;
    }
  };

  return (
    <View style={styles.tabContent}>
      {match.events.map((event) => (
        <View
          key={event.id}
          style={[
            styles.eventRow,
            event.team === 'home' ? styles.eventHome : styles.eventAway,
          ]}
        >
          <View style={styles.eventIconContainer}>{getEventIcon(event.type)}</View>
          <View style={styles.eventInfo}>
            <Text style={styles.eventPlayer}>{event.player}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
          </View>
          <Text style={styles.eventMinute}>{event.minute}`</Text>
        </View>
      ))}
    </View>
  );
}

function LineupsTab({ match }) {
  if (!match.homeLineup) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Lineups not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.tabContent}>
      <View style={styles.lineupsContainer}>
        <View style={styles.teamLineup}>
          <Text style={styles.lineupTeamName}>{match.homeTeam.name}</Text>
          {match.homeLineup.map((player) => (
            <View key={player.id} style={styles.playerRow}>
              <View style={styles.playerNumber}>{player.number}</View>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerPosition}>{player.position}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.teamLineup}>
          <Text style={styles.lineupTeamName}>{match.awayTeam.name}</Text>
          {match.awayLineup?.map((player) => (
            <View key={player.id} style={styles.playerRow}>
              <View style={styles.playerNumber}>{player.number}</View>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerPosition}>{player.position}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function H2HTab() {
  return (
    <View style={styles.tabContent}>
      <View style={styles.h2hContainer}>
        <View style={styles.h2hRow}>
          <Text style={styles.h2hLabel}>Last 5 Matches</Text>
        </View>
        <View style={styles.h2hRecord}>
          <View style={styles.h2hResult}>
            <Text style={[styles.h2hResultText, styles.h2hWin]}>W</Text>
          </View>
          <View style={styles.h2hResult}>
            <Text style={[styles.h2hResultText, styles.h2hWin]}>W</Text>
          </View>
          <View style={styles.h2hResult}>
            <Text style={[styles.h2hResultText, styles.h2hDraw]}>D</Text>
          </View>
          <View style={styles.h2hResult}>
            <Text style={[styles.h2hResultText, styles.h2hLoss]}>L</Text>
          </View>
          <View style={styles.h2hResult}>
            <Text style={[styles.h2hResultText, styles.h2hWin]}>W</Text>
          </View>
        </View>
        <View style={styles.h2hStats}>
          <View style={styles.h2hStat}>
            <Text style={styles.h2hStatValue}>12</Text>
            <Text style={styles.h2hStatLabel}>Goals</Text>
          </View>
          <View style={styles.h2hStat}>
            <Text style={styles.h2hStatValue}>4</Text>
            <Text style={styles.h2hStatLabel}>Wins</Text>
          </View>
          <View style={styles.h2hStat}>
            <Text style={styles.h2hStatValue}>1</Text>
            <Text style={styles.h2hStatLabel}>Loss</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogo: {
    fontSize: 48,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  scoreSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  score: {
    fontSize: 42,
    fontWeight: '700',
    color: '#4A5568',
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: '#E53935',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  league: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4A90E2',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
  tabContent: {
    paddingHorizontal: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
  },
  statValue: {
    flex: 0.3,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A5568',
  },
  statLabel: {
    flex: 0.4,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
  },
  eventHome: {
    borderLeftColor: '#10B981',
  },
  eventAway: {
    borderLeftColor: '#3B82F6',
  },
  eventIconContainer: {
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventPlayer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  eventDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  eventMinute: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A5568',
    marginLeft: 12,
  },
  lineupsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  teamLineup: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
  lineupTeamName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  playerNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  playerPosition: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  h2hContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  h2hRow: {
    marginBottom: 16,
  },
  h2hLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  h2hRecord: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  h2hResult: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  h2hResultText: {
    fontSize: 18,
    fontWeight: '700',
  },
  h2hWin: {
    color: '#10B981',
  },
  h2hDraw: {
    color: '#F59E0B',
  },
  h2hLoss: {
    color: '#EF4444',
  },
  h2hStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  h2hStat: {
    alignItems: 'center',
  },
  h2hStatValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4A5568',
  },
  h2hStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
  },
  bottomPadding: {
    height: 100,
  },
});