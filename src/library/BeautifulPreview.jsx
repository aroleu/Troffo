import ApprovalCard from '@/beautiful-ai/components/ApprovalCard'
import ChatComposer from '@/beautiful-ai/components/ChatComposer'
import CodeBlock from '@/beautiful-ai/components/CodeBlock'
import ContextCards from '@/beautiful-ai/components/ContextCards'
import DiffTable from '@/beautiful-ai/components/DiffTable'
import FilterTable from '@/beautiful-ai/components/FilterTable'
import FineTuneCard from '@/beautiful-ai/components/FineTuneCard'
import InsightCards from '@/beautiful-ai/components/InsightCards'
import LoadingState from '@/beautiful-ai/components/LoadingState'
import PromptBar from '@/beautiful-ai/components/PromptBar'
import RecommendationCard from '@/beautiful-ai/components/RecommendationCard'
import RecordsTable from '@/beautiful-ai/components/RecordsTable'
import SearchList from '@/beautiful-ai/components/SearchList'
import SelectionActions from '@/beautiful-ai/components/SelectionActions'
import SidebarNav from '@/beautiful-ai/components/SidebarNav'
import StreamingText from '@/beautiful-ai/components/StreamingText'
import TaskRows from '@/beautiful-ai/components/TaskRows'
import ThinkingState from '@/beautiful-ai/components/ThinkingState'
import ToolChips from '@/beautiful-ai/components/ToolChips'

const previews = {
  ApprovalCard,
  ChatComposer,
  CodeBlock,
  ContextCards,
  DiffTable,
  FilterTable,
  FineTuneCard,
  InsightCards,
  LoadingState,
  PromptBar,
  RecommendationCard,
  RecordsTable,
  SearchList,
  SelectionActions,
  SidebarNav,
  StreamingText,
  TaskRows,
  ThinkingState,
  ToolChips,
}

export default function BeautifulPreview({ name }) {
  const Component = previews[name] || LoadingState
  const props = name === 'PromptBar' ? { variant: 'Rounded' } : name === 'ThinkingState' ? { variant: 'Steps' } : {}
  return <div className={`beautiful-ai-scope beautiful-preview beautiful-preview--${name}`}><Component {...props} /></div>
}
