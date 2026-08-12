import { useState } from 'react'
import {
  RiArrowLeftSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiCheckLine,
  RiDeleteBinLine,
  RiGithubFill,
  RiHome5Line,
  RiInformationFill,
  RiSearchLine,
  RiSparklingLine,
  RiUploadCloud2Line,
  RiUserLine,
} from '@remixicon/react'
import * as Accordion from '@/alignui/components/ui/accordion'
import * as Alert from '@/alignui/components/ui/alert'
import * as Avatar from '@/alignui/components/ui/avatar'
import { IconEmptyCompany, IconEmptyUser } from '@/alignui/components/ui/avatar-empty-icons'
import * as AvatarGroup from '@/alignui/components/ui/avatar-group'
import * as AvatarGroupCompact from '@/alignui/components/ui/avatar-group-compact'
import * as Badge from '@/alignui/components/ui/badge'
import * as Breadcrumb from '@/alignui/components/ui/breadcrumb'
import * as Button from '@/alignui/components/ui/button'
import * as ButtonGroup from '@/alignui/components/ui/button-group'
import * as Checkbox from '@/alignui/components/ui/checkbox'
import * as ColorPicker from '@/alignui/components/ui/color-picker'
import * as CommandMenu from '@/alignui/components/ui/command-menu'
import * as CompactButton from '@/alignui/components/ui/compact-button'
import { Calendar } from '@/alignui/components/ui/datepicker'
import * as DigitInput from '@/alignui/components/ui/digit-input'
import * as Divider from '@/alignui/components/ui/divider'
import * as DotStepper from '@/alignui/components/ui/dot-stepper'
import * as Drawer from '@/alignui/components/ui/drawer'
import * as Dropdown from '@/alignui/components/ui/dropdown'
import * as FancyButton from '@/alignui/components/ui/fancy-button'
import * as FileFormatIcon from '@/alignui/components/ui/file-format-icon'
import * as FileUpload from '@/alignui/components/ui/file-upload'
import * as Hint from '@/alignui/components/ui/hint'
import * as HorizontalStepper from '@/alignui/components/ui/horizontal-stepper'
import * as Input from '@/alignui/components/ui/input'
import * as Kbd from '@/alignui/components/ui/kbd'
import * as Label from '@/alignui/components/ui/label'
import * as LinkButton from '@/alignui/components/ui/link-button'
import * as Modal from '@/alignui/components/ui/modal'
import * as Notification from '@/alignui/components/ui/notification'
import { NotificationProvider } from '@/alignui/components/ui/notification-provider'
import * as Pagination from '@/alignui/components/ui/pagination'
import * as Popover from '@/alignui/components/ui/popover'
import * as ProgressBar from '@/alignui/components/ui/progress-bar'
import * as ProgressCircle from '@/alignui/components/ui/progress-circle'
import * as Radio from '@/alignui/components/ui/radio'
import * as SegmentedControl from '@/alignui/components/ui/segmented-control'
import * as Select from '@/alignui/components/ui/select'
import * as Slider from '@/alignui/components/ui/slider'
import * as SocialButton from '@/alignui/components/ui/social-button'
import * as StatusBadge from '@/alignui/components/ui/status-badge'
import { StarRating, SVGHeartFill, SVGStarFill } from '@/alignui/components/ui/svg-rating-icons'
import * as Switch from '@/alignui/components/ui/switch'
import * as TabMenuHorizontal from '@/alignui/components/ui/tab-menu-horizontal'
import * as TabMenuVertical from '@/alignui/components/ui/tab-menu-vertical'
import * as Table from '@/alignui/components/ui/table'
import * as Tag from '@/alignui/components/ui/tag'
import * as Textarea from '@/alignui/components/ui/textarea'
import * as Tooltip from '@/alignui/components/ui/tooltip'
import * as VerticalStepper from '@/alignui/components/ui/vertical-stepper'

function PreviewFrame({ children, narrow = false }) {
  return <div className={`align-preview__stage${narrow ? ' align-preview__stage--narrow' : ''}`}>{children}</div>
}

function AccordionPreview() {
  return (
    <PreviewFrame narrow>
      <Accordion.Root type="single" defaultValue="item-1" collapsible className="w-full">
        <Accordion.Item value="item-1">
          <Accordion.Header>
            <Accordion.Trigger>
              How does AlignUI styling work?
              <Accordion.Arrow />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Composable primitives share the same tokens, spacing and interaction language.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Header>
            <Accordion.Trigger>
              Is it accessible?
              <Accordion.Arrow />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Interactive foundations use Radix UI and semantic HTML.</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </PreviewFrame>
  )
}

function AlertPreview() {
  return (
    <PreviewFrame narrow>
      <Alert.Root status="information" variant="filled">
        <Alert.Icon as={RiInformationFill} />
        <div><strong>Workspace synced</strong><div className="text-paragraph-xs opacity-75">All component contracts are ready for Agent mode.</div></div>
        <Alert.CloseIcon />
      </Alert.Root>
    </PreviewFrame>
  )
}

const avatarColors = ['blue', 'purple', 'yellow']
function AvatarPreview({ group, compact }) {
  const avatars = avatarColors.map((color, index) => <Avatar.Root key={color} size={compact ? '32' : '48'} color={color}>{['AL', 'DC', 'JT'][index]}</Avatar.Root>)
  if (compact) return <PreviewFrame><AvatarGroupCompact.Root size="32" variant="stroke"><AvatarGroupCompact.Stack>{avatars}</AvatarGroupCompact.Stack><AvatarGroupCompact.Overflow>+9</AvatarGroupCompact.Overflow></AvatarGroupCompact.Root></PreviewFrame>
  if (group) return <PreviewFrame><AvatarGroup.Root size="48">{avatars}<AvatarGroup.Overflow>+12</AvatarGroup.Overflow></AvatarGroup.Root></PreviewFrame>
  return <PreviewFrame><Avatar.Root size="64" color="blue">DC<Avatar.Indicator><Avatar.Status status="online" /></Avatar.Indicator></Avatar.Root></PreviewFrame>
}

function ControlsPreview({ type }) {
  const [checked, setChecked] = useState(true)
  if (type === 'checkbox') return <PreviewFrame><label className="flex items-center gap-2 text-label-sm"><Checkbox.Root checked={checked} onCheckedChange={setChecked} /> Include source metadata</label></PreviewFrame>
  if (type === 'switch') return <PreviewFrame><label className="flex items-center gap-3 text-label-sm"><Switch.Root checked={checked} onCheckedChange={setChecked} /> Agent-ready output</label></PreviewFrame>
  return <PreviewFrame><Radio.Group defaultValue="react" className="flex gap-5"><label className="flex items-center gap-2"><Radio.Item value="react" /> React</label><label className="flex items-center gap-2"><Radio.Item value="css" /> CSS</label></Radio.Group></PreviewFrame>
}

function InputPreview() {
  return <PreviewFrame narrow><Input.Root><Input.Wrapper><Input.Icon as={RiSearchLine} /><Input.Input placeholder="Search components..." /></Input.Wrapper><Input.Affix>⌘ K</Input.Affix></Input.Root></PreviewFrame>
}

function SelectPreview() {
  return (
    <PreviewFrame narrow>
      <Select.Root defaultValue="alignui">
        <Select.Trigger><Select.Value placeholder="Select a source" /></Select.Trigger>
        <Select.Content>
          <Select.Item value="alignui">AlignUI · MIT</Select.Item>
          <Select.Item value="beautiful">Beautiful AI</Select.Item>
          <Select.Item value="troffo">Troffo Core</Select.Item>
        </Select.Content>
      </Select.Root>
    </PreviewFrame>
  )
}

function DatePreview() {
  const [date, setDate] = useState(new Date())
  return <PreviewFrame><div className="overflow-auto rounded-xl border border-stroke-soft-200 bg-bg-white-0"><Calendar mode="single" selected={date} onSelect={setDate} /></div></PreviewFrame>
}

function ButtonPreview({ fancy, compact, link, group }) {
  if (group) return <PreviewFrame><ButtonGroup.Root><ButtonGroup.Item data-state="on">Human</ButtonGroup.Item><ButtonGroup.Item>Agent</ButtonGroup.Item><ButtonGroup.Item>JSON</ButtonGroup.Item></ButtonGroup.Root></PreviewFrame>
  if (compact) return <PreviewFrame><CompactButton.Root variant="white" size="large" aria-label="Search"><CompactButton.Icon as={RiSearchLine} /></CompactButton.Root></PreviewFrame>
  if (link) return <PreviewFrame><LinkButton.Root><span>View documentation</span><LinkButton.Icon as={RiArrowRightLine} /></LinkButton.Root></PreviewFrame>
  if (fancy) return <PreviewFrame><FancyButton.Root variant="primary"><FancyButton.Icon as={RiSparklingLine} />Generate with AI</FancyButton.Root></PreviewFrame>
  return <PreviewFrame><div className="flex flex-wrap gap-3"><Button.Root>Primary action</Button.Root><Button.Root variant="neutral" mode="stroke">Secondary</Button.Root><Button.Root variant="error" mode="lighter"><Button.Icon as={RiDeleteBinLine} />Delete</Button.Root></div></PreviewFrame>
}

function ModalPreview({ drawer }) {
  if (drawer) return (
    <PreviewFrame>
      <Drawer.Root>
        <Drawer.Trigger asChild><Button.Root variant="neutral" mode="stroke">Open drawer</Button.Root></Drawer.Trigger>
        <Drawer.Content><Drawer.Header><Drawer.Title>Component settings</Drawer.Title></Drawer.Header><Drawer.Body className="p-5 text-paragraph-sm text-text-sub-600">Configure the selected component without leaving the library.</Drawer.Body><Drawer.Footer><Button.Root className="w-full">Save settings</Button.Root></Drawer.Footer></Drawer.Content>
      </Drawer.Root>
    </PreviewFrame>
  )
  return (
    <PreviewFrame>
      <Modal.Root>
        <Modal.Trigger asChild><Button.Root>Open modal</Button.Root></Modal.Trigger>
        <Modal.Content><Modal.Header title="Publish component?" description="The Agent manifest will be regenerated." /><Modal.Body className="text-paragraph-sm text-text-sub-600">Review the component contract before publishing it to the local registry.</Modal.Body><Modal.Footer><Modal.Close asChild><Button.Root variant="neutral" mode="stroke">Cancel</Button.Root></Modal.Close><Button.Root>Publish</Button.Root></Modal.Footer></Modal.Content>
      </Modal.Root>
    </PreviewFrame>
  )
}

function DropdownPreview({ popover }) {
  if (popover) return <PreviewFrame><Popover.Root><Popover.Trigger asChild><Button.Root variant="neutral" mode="stroke">Open popover</Button.Root></Popover.Trigger><Popover.Content className="w-64"><strong className="text-label-sm">Agent hint</strong><p className="mt-1 text-paragraph-xs text-text-sub-600">Prefer structured props over visual guesswork.</p></Popover.Content></Popover.Root></PreviewFrame>
  return (
    <PreviewFrame>
      <Dropdown.Root>
        <Dropdown.Trigger asChild><Button.Root variant="neutral" mode="stroke">More actions</Button.Root></Dropdown.Trigger>
        <Dropdown.Content><Dropdown.Item><Dropdown.ItemIcon as={RiUserLine} />Assign owner</Dropdown.Item><Dropdown.Item><Dropdown.ItemIcon as={RiDeleteBinLine} />Archive</Dropdown.Item></Dropdown.Content>
      </Dropdown.Root>
    </PreviewFrame>
  )
}

function TabsPreview({ vertical, segmented }) {
  if (segmented) return <PreviewFrame narrow><SegmentedControl.Root defaultValue="human"><SegmentedControl.List><SegmentedControl.Trigger value="human">Human</SegmentedControl.Trigger><SegmentedControl.Trigger value="agent">Agent</SegmentedControl.Trigger></SegmentedControl.List></SegmentedControl.Root></PreviewFrame>
  if (vertical) return <PreviewFrame narrow><TabMenuVertical.Root defaultValue="components"><TabMenuVertical.List><TabMenuVertical.Trigger value="components">Components</TabMenuVertical.Trigger><TabMenuVertical.Trigger value="patterns">Patterns</TabMenuVertical.Trigger><TabMenuVertical.Trigger value="tokens">Tokens</TabMenuVertical.Trigger></TabMenuVertical.List></TabMenuVertical.Root></PreviewFrame>
  return <PreviewFrame narrow><TabMenuHorizontal.Root defaultValue="preview"><TabMenuHorizontal.List><TabMenuHorizontal.Trigger value="preview">Preview</TabMenuHorizontal.Trigger><TabMenuHorizontal.Trigger value="code">Code</TabMenuHorizontal.Trigger><TabMenuHorizontal.Trigger value="props">Props</TabMenuHorizontal.Trigger></TabMenuHorizontal.List></TabMenuHorizontal.Root></PreviewFrame>
}

function StepperPreview({ vertical, dots }) {
  if (dots) return <PreviewFrame><DotStepper.Root>{[0, 1, 2, 3].map((number) => <DotStepper.Item key={number} active={number === 1} aria-label={`Step ${number + 1}`} />)}</DotStepper.Root></PreviewFrame>
  if (vertical) return <PreviewFrame narrow><VerticalStepper.Root><VerticalStepper.Item state="completed"><VerticalStepper.ItemIndicator />Choose source</VerticalStepper.Item><VerticalStepper.Item state="active"><VerticalStepper.ItemIndicator>2</VerticalStepper.ItemIndicator>Configure props<VerticalStepper.Arrow /></VerticalStepper.Item><VerticalStepper.Item><VerticalStepper.ItemIndicator>3</VerticalStepper.ItemIndicator>Generate code</VerticalStepper.Item></VerticalStepper.Root></PreviewFrame>
  return <PreviewFrame><HorizontalStepper.Root><HorizontalStepper.Item state="completed"><HorizontalStepper.ItemIndicator />Source</HorizontalStepper.Item><HorizontalStepper.SeparatorIcon /><HorizontalStepper.Item state="active"><HorizontalStepper.ItemIndicator>2</HorizontalStepper.ItemIndicator>Props</HorizontalStepper.Item><HorizontalStepper.SeparatorIcon /><HorizontalStepper.Item><HorizontalStepper.ItemIndicator>3</HorizontalStepper.ItemIndicator>Code</HorizontalStepper.Item></HorizontalStepper.Root></PreviewFrame>
}

function ProgressPreview({ circle }) {
  return circle ? <PreviewFrame><ProgressCircle.Root value={72} size="72">72%</ProgressCircle.Root></PreviewFrame> : <PreviewFrame narrow><div className="w-full"><div className="mb-2 flex justify-between text-label-sm"><span>Registry coverage</span><span>84%</span></div><ProgressBar.Root value={84} /></div></PreviewFrame>
}

function TablePreview() {
  return <PreviewFrame narrow><Table.Root><Table.Header><Table.Row><Table.Head>Component</Table.Head><Table.Head>Source</Table.Head><Table.Head>Status</Table.Head></Table.Row></Table.Header><Table.Body><Table.Row><Table.Cell className="text-label-sm">Button</Table.Cell><Table.Cell>AlignUI</Table.Cell><Table.Cell><StatusBadge.Root status="completed" variant="light"><StatusBadge.Dot />Ready</StatusBadge.Root></Table.Cell></Table.Row><Table.RowDivider /><Table.Row><Table.Cell className="text-label-sm">ThinkingOrb</Table.Cell><Table.Cell>Orbs</Table.Cell><Table.Cell><StatusBadge.Root status="completed" variant="light"><StatusBadge.Dot />Ready</StatusBadge.Root></Table.Cell></Table.Row></Table.Body></Table.Root></PreviewFrame>
}

function NotificationPreview({ providerOnly = false }) {
  return <PreviewFrame narrow><Notification.Provider><Notification.Root open status="success" title={providerOnly ? 'Provider mounted' : 'Component imported'} description="The local registry is up to date." disableDismiss /><Notification.Viewport className="!absolute !inset-auto !w-full !p-0" /></Notification.Provider>{providerOnly ? <span className="sr-only"><NotificationProvider /></span> : null}</PreviewFrame>
}

function CommandPreview() {
  const [open, setOpen] = useState(false)
  return <PreviewFrame><Button.Root onClick={() => setOpen(true)} variant="neutral" mode="stroke"><Button.Icon as={RiSearchLine} />Open command menu</Button.Root><CommandMenu.Dialog open={open} onOpenChange={setOpen}><CommandMenu.DialogTitle className="sr-only">Command menu</CommandMenu.DialogTitle><div className="p-4"><CommandMenu.Input placeholder="Search components..." /></div><CommandMenu.List><CommandMenu.Group heading="Components"><CommandMenu.Item><CommandMenu.ItemIcon as={RiSparklingLine} />Thinking Orb</CommandMenu.Item><CommandMenu.Item><CommandMenu.ItemIcon as={RiHome5Line} />Sidebar Shell</CommandMenu.Item></CommandMenu.Group></CommandMenu.List></CommandMenu.Dialog></PreviewFrame>
}

function ColorPreview() {
  return <PreviewFrame narrow><ColorPicker.Root defaultValue="#335cff"><ColorPicker.SwatchPicker><ColorPicker.SwatchPickerItem color="#335cff"><ColorPicker.Swatch /></ColorPicker.SwatchPickerItem><ColorPicker.SwatchPickerItem color="#7d52f4"><ColorPicker.Swatch /></ColorPicker.SwatchPickerItem><ColorPicker.SwatchPickerItem color="#1fc16b"><ColorPicker.Swatch /></ColorPicker.SwatchPickerItem><ColorPicker.SwatchPickerItem color="#fb3748"><ColorPicker.Swatch /></ColorPicker.SwatchPickerItem></ColorPicker.SwatchPicker></ColorPicker.Root></PreviewFrame>
}

function FilePreview({ format }) {
  if (format) return <PreviewFrame><div className="flex gap-4"><FileFormatIcon.Root format="PDF" color="red" /><FileFormatIcon.Root format="CSV" color="green" /><FileFormatIcon.Root format="FIG" color="purple" /></div></PreviewFrame>
  return <PreviewFrame narrow><FileUpload.Root><FileUpload.Icon as={RiUploadCloud2Line} /><div><strong className="text-label-sm">Drop component files here</strong><p className="mt-1 text-paragraph-xs text-text-sub-600">TSX, CSS or JSON up to 10 MB</p></div><FileUpload.Button>Browse files</FileUpload.Button><input type="file" hidden /></FileUpload.Root></PreviewFrame>
}

function GenericDataPreview({ type }) {
  if (type === 'badge') return <PreviewFrame><div className="flex gap-2"><Badge.Root color="blue">New</Badge.Root><Badge.Root color="green">Ready</Badge.Root><Badge.Root color="orange">Review</Badge.Root></div></PreviewFrame>
  if (type === 'status-badge') return <PreviewFrame><div className="flex gap-2"><StatusBadge.Root status="completed" variant="light"><StatusBadge.Dot />Completed</StatusBadge.Root><StatusBadge.Root status="pending" variant="light"><StatusBadge.Dot />Pending</StatusBadge.Root></div></PreviewFrame>
  if (type === 'rating') return <PreviewFrame><div className="flex items-center gap-4 text-away-base"><StarRating rating={4.5} /><SVGStarFill className="size-6" /><SVGHeartFill className="size-6 text-error-base" /></div></PreviewFrame>
  if (type === 'tag') return <PreviewFrame><div className="flex gap-2"><Tag.Root>Agent ready<Tag.DismissButton /></Tag.Root><Tag.Root variant="gray">AlignUI<Tag.DismissButton /></Tag.Root></div></PreviewFrame>
  return <PreviewFrame><div className="flex gap-5 text-text-sub-600"><IconEmptyUser className="size-16" /><IconEmptyCompany className="size-16" /></div></PreviewFrame>
}

function OtherPreview({ type }) {
  if (type === 'breadcrumb') return <PreviewFrame><Breadcrumb.Root><Breadcrumb.Item><Breadcrumb.Icon as={RiHome5Line} />Library</Breadcrumb.Item><Breadcrumb.ArrowIcon as={RiArrowRightSLine} /><Breadcrumb.Item>AlignUI</Breadcrumb.Item><Breadcrumb.ArrowIcon as={RiArrowRightSLine} /><Breadcrumb.Item active>Button</Breadcrumb.Item></Breadcrumb.Root></PreviewFrame>
  if (type === 'divider') return <PreviewFrame narrow><div className="w-full space-y-6"><Divider.Root /><Divider.Root variant="line-text">OR</Divider.Root><Divider.Root variant="solid-text">COMPONENTS</Divider.Root></div></PreviewFrame>
  if (type === 'hint') return <PreviewFrame narrow><Hint.Root><Hint.Icon as={RiInformationFill} />Use the Agent tab to copy a structured contract.</Hint.Root></PreviewFrame>
  if (type === 'kbd') return <PreviewFrame><div className="flex gap-2"><Kbd.Root>⌘</Kbd.Root><Kbd.Root>K</Kbd.Root><Kbd.Root>ESC</Kbd.Root></div></PreviewFrame>
  if (type === 'label') return <PreviewFrame narrow><div className="w-full"><Label.Root htmlFor="align-name">Component name<Label.Asterisk /></Label.Root><Input.Root className="mt-2"><Input.Wrapper><Input.Input id="align-name" defaultValue="Agent Card" /></Input.Wrapper></Input.Root><Label.Sub className="mt-1 block">Must be unique inside the registry.</Label.Sub></div></PreviewFrame>
  if (type === 'pagination') return <PreviewFrame><Pagination.Root><Pagination.NavButton><Pagination.NavIcon as={RiArrowLeftSLine} /></Pagination.NavButton><Pagination.Item current>1</Pagination.Item><Pagination.Item>2</Pagination.Item><Pagination.Item>3</Pagination.Item><Pagination.NavButton><Pagination.NavIcon as={RiArrowRightSLine} /></Pagination.NavButton></Pagination.Root></PreviewFrame>
  if (type === 'slider') return <PreviewFrame narrow><Slider.Root defaultValue={[68]}><Slider.Thumb /></Slider.Root></PreviewFrame>
  if (type === 'social') return <PreviewFrame><SocialButton.Root brand="github" mode="filled"><SocialButton.Icon as={RiGithubFill} />Continue with GitHub</SocialButton.Root></PreviewFrame>
  if (type === 'textarea') return <PreviewFrame narrow><Textarea.Root defaultValue="Build a searchable component library for humans and agents." maxLength={120}><Textarea.CharCounter current={67} max={120} /></Textarea.Root></PreviewFrame>
  if (type === 'tooltip') return <PreviewFrame><Tooltip.Provider><Tooltip.Root defaultOpen><Tooltip.Trigger asChild><Button.Root variant="neutral" mode="stroke">Hover for details</Button.Root></Tooltip.Trigger><Tooltip.Content>Agent-ready component metadata</Tooltip.Content></Tooltip.Root></Tooltip.Provider></PreviewFrame>
  return <PreviewFrame><div className="align-preview__module"><RiCheckLine /> Official source module is available locally</div></PreviewFrame>
}

export default function AlignUIPreview({ slug }) {
  switch (slug) {
    case 'accordion': return <AccordionPreview />
    case 'alert': return <AlertPreview />
    case 'avatar': return <AvatarPreview />
    case 'avatar-empty-icons': return <GenericDataPreview />
    case 'avatar-group': return <AvatarPreview group />
    case 'avatar-group-compact': return <AvatarPreview compact />
    case 'badge': return <GenericDataPreview type="badge" />
    case 'breadcrumb': return <OtherPreview type="breadcrumb" />
    case 'button': return <ButtonPreview />
    case 'button-group': return <ButtonPreview group />
    case 'checkbox': return <ControlsPreview type="checkbox" />
    case 'color-picker': return <ColorPreview />
    case 'command-menu': return <CommandPreview />
    case 'compact-button': return <ButtonPreview compact />
    case 'datepicker': return <DatePreview />
    case 'digit-input': return <DigitInputPreview />
    case 'divider': return <OtherPreview type="divider" />
    case 'dot-stepper': return <StepperPreview dots />
    case 'drawer': return <ModalPreview drawer />
    case 'dropdown': return <DropdownPreview />
    case 'fancy-button': return <ButtonPreview fancy />
    case 'file-format-icon': return <FilePreview format />
    case 'file-upload': return <FilePreview />
    case 'hint': return <OtherPreview type="hint" />
    case 'horizontal-stepper': return <StepperPreview />
    case 'input': return <InputPreview />
    case 'kbd': return <OtherPreview type="kbd" />
    case 'label': return <OtherPreview type="label" />
    case 'link-button': return <ButtonPreview link />
    case 'modal': return <ModalPreview />
    case 'notification': return <NotificationPreview />
    case 'notification-provider': return <NotificationPreview providerOnly />
    case 'pagination': return <OtherPreview type="pagination" />
    case 'popover': return <DropdownPreview popover />
    case 'progress-bar': return <ProgressPreview />
    case 'progress-circle': return <ProgressPreview circle />
    case 'radio': return <ControlsPreview type="radio" />
    case 'segmented-control': return <TabsPreview segmented />
    case 'select': return <SelectPreview />
    case 'slider': return <OtherPreview type="slider" />
    case 'social-button': return <OtherPreview type="social" />
    case 'status-badge': return <GenericDataPreview type="status-badge" />
    case 'svg-rating-icons': return <GenericDataPreview type="rating" />
    case 'switch': return <ControlsPreview type="switch" />
    case 'tab-menu-horizontal': return <TabsPreview />
    case 'tab-menu-vertical': return <TabsPreview vertical />
    case 'table': return <TablePreview />
    case 'tag': return <GenericDataPreview type="tag" />
    case 'textarea': return <OtherPreview type="textarea" />
    case 'tooltip': return <OtherPreview type="tooltip" />
    case 'vertical-stepper': return <StepperPreview vertical />
    default: return <OtherPreview />
  }
}

function DigitInputPreview() {
  const [value, setValue] = useState('2608')
  return <PreviewFrame narrow><DigitInput.Root value={value} onChange={setValue} numInputs={4} inputType="tel" /></PreviewFrame>
}
