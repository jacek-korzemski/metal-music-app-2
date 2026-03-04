import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Box } from "./components/Box/Box";
import { IconButton } from "./components/Box/styles";
import { Button } from "./components/Button/Button";
import ButtonGroup from "./components/Button/ButtonGroup";
import Collapsible from "./components/Collapsible/Collapsible";
import TreeItem from "./components/Collapsible/TreeItem";
import { ContextMenu } from "./components/ContextMenu/ContextMenu";
import FileIcon from "./components/Icon/FileIcon";
import FolderIcon from "./components/Icon/FolderIcon";
import MoreIcon from "./components/Icon/MoreIcon";
import SettingsIcon from "./components/Icon/SettingsIcon";
import ContentLoader from "./components/Loader/ContentLoader";
import Loader from "./components/Loader/Loader";
import PageLoader from "./components/Loader/PageLoader";
import Skeleton from "./components/Loader/Skeleton";
import ConfirmDialog from "./components/Modal/ConfirmDialog";
import Modal from "./components/Modal/Modal";
import Sidebar from "./components/Sidebar/Sidebar";
import SidebarLayout from "./components/Sidebar/SidebarLayout";
import { useSnackbar, SnackbarProvider } from "./components/Snackbar";
import { Tooltip } from "./components/Tooltip/Tooltip";
import useGetData from "./hooks/useGetData";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { Checkbox } from "./components/Form/Checkbox";
import Input from "./components/Form/Input";
import MultiSelect from "./components/Form/MultiSelect";
import Radio from "./components/Form/Radio";
import RadioGroup from "./components/Form/RadioGroup";
import { Select } from "./components/Form/Select";
import { Switch } from "./components/Form/Switch";
import Textarea from "./components/Form/Textarea";
import { Column, Row } from "./components/Layout/Column";
import Grid from "./components/Layout/Grid";

const DemoContent: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  
  // State
  const [modalOpen, setModalOpen] = useState(false);
  const [draggableModalOpen, setDraggableModalOpen] = useState(false);
  const [fullscreenModalOpen, setFullscreenModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  
  // Form state
  const [inputValue, setInputValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);

  // API Demo
  const { data, isFetching, isError, refetch } = useGetData<{ title: string }[]>({
    apiUrl: 'https://jsonplaceholder.typicode.com/posts?_limit=3',
    enabled: true,
  });

  // Context menu items
  const contextMenuItems = [
    {
      id: 'new',
      label: 'New File',
      icon: <FileIcon />,
      shortcut: 'Ctrl+N',
      onClick: () => showSnackbar({ message: 'New File clicked', type: 'info' }),
    },
    {
      id: 'open',
      label: 'Open',
      icon: <FolderIcon />,
      children: [
        {
          id: 'open-recent',
          label: 'Recent Files',
          children: [
            { id: 'file1', label: 'document.tsx', onClick: () => {} },
            { id: 'file2', label: 'styles.css', onClick: () => {} },
            { id: 'file3', label: 'config.json', onClick: () => {} },
          ],
        },
        {
          id: 'open-folder',
          label: 'Open Folder...',
          onClick: () => {},
        },
      ],
    },
    { id: 'divider1', type: 'divider' as const },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      shortcut: 'Ctrl+,',
      onClick: () => showSnackbar({ message: 'Settings clicked', type: 'info' }),
    },
    { id: 'divider2', type: 'divider' as const },
    {
      id: 'delete',
      label: 'Delete',
      danger: true,
      onClick: () => setConfirmOpen(true),
    },
  ];

  const selectOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <Column gap="24px" padding="24px" fullWidth>
      <PageLoader isLoading={pageLoading} text="Loading application..." />
      
      {/* Header */}
      <Row justify="space-between" align="center">
        <h1 style={{ margin: 0, fontSize: '24px' }}>VSCode Style UI Template</h1>
        <Row gap="8px">
          <ContextMenu trigger={
            <IconButton>
              <MoreIcon />
            </IconButton>
          } items={contextMenuItems} />
        </Row>
      </Row>

      {/* Buttons Section */}
      <Box title="Buttons" collapsible>
        <Column gap="16px">
          <Row gap="8px" wrap>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </Row>
          
          <Row gap="8px" wrap>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          
          <Row gap="8px">
            <ButtonGroup attached>
              <Button variant="secondary">Left</Button>
              <Button variant="secondary">Center</Button>
              <Button variant="secondary">Right</Button>
            </ButtonGroup>
          </Row>
          
          <Row gap="8px">
            <Tooltip content="This is a tooltip">
              <Button variant="tertiary">Hover me</Button>
            </Tooltip>
          </Row>
        </Column>
      </Box>

      {/* Forms Section */}
      <Grid columns={2} gap="24px">
        <Box title="Form Inputs" collapsible>
          <Column gap="16px">
            <Input
              label="Text Input"
              placeholder="Enter text..."
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              fullWidth
            />
            <Input
              label="With Error"
              error="This field is required"
              placeholder="Error state..."
              fullWidth
            />
            <Textarea
              label="Textarea"
              placeholder="Enter description..."
              fullWidth
            />
            <Select
              label="Select"
              options={selectOptions}
              value={selectValue}
              onChange={setSelectValue}
              placeholder="Choose a framework..."
              fullWidth
              searchable
            />
            <MultiSelect
              label="Multi Select"
              options={selectOptions}
              value={multiSelectValue}
              onChange={setMultiSelectValue}
              placeholder="Choose frameworks..."
              fullWidth
              searchable
            />
          </Column>
        </Box>

        <Box title="Toggles & Checks" collapsible>
          <Column gap="16px">
            <Switch
              label="Toggle Switch"
              checked={switchValue}
              onChange={(e) => setSwitchValue(e.target.checked)}
            />
            <Checkbox
              label="Checkbox Option"
              checked={checkboxValue}
              onChange={(e) => setCheckboxValue(e.target.checked)}
            />
            <RadioGroup
              name="demo-radio"
              value={radioValue}
              onChange={setRadioValue}
            >
              <Radio value="option1" label="Option 1" />
              <Radio value="option2" label="Option 2" />
              <Radio value="option3" label="Option 3" />
            </RadioGroup>
          </Column>
        </Box>
      </Grid>

      {/* Modals Section */}
      <Box title="Modals & Dialogs">
        <Row gap="8px" wrap>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="secondary" onClick={() => setDraggableModalOpen(true)}>
            Draggable Modal
          </Button>
          <Button variant="tertiary" onClick={() => setFullscreenModalOpen(true)}>
            Fullscreen Modal
          </Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Confirm Dialog
          </Button>
        </Row>
      </Box>

      {/* Snackbars Section */}
      <Box title="Snackbars">
        <Row gap="8px" wrap>
          <Button 
            variant="secondary"
            onClick={() => showSnackbar({ 
              message: 'This is an info message', 
              type: 'info',
              duration: 3000 
            })}
          >
            Info Toast
          </Button>
          <Button 
            variant="success"
            onClick={() => showSnackbar({ 
              message: 'Operation successful!', 
              type: 'success',
              duration: 3000 
            })}
          >
            Success Toast
          </Button>
          <Button 
            variant="tertiary"
            onClick={() => showSnackbar({ 
              message: 'Warning: Check your input', 
              type: 'warning',
              duration: 5000 
            })}
          >
            Warning Toast
          </Button>
          <Button 
            variant="danger"
            onClick={() => showSnackbar({ 
              message: 'Error occurred!', 
              type: 'error',
              duration: 0, // Manual dismiss
              action: {
                label: 'Retry',
                onClick: () => console.log('Retrying...'),
              }
            })}
          >
            Error Toast (Manual)
          </Button>
        </Row>
      </Box>

      {/* Loaders Section */}
      <Box title="Loaders">
        <Row gap="24px" wrap align="center">
          <Column align="center" gap="8px">
            <Loader variant="spinner" size="md" />
            <span>Spinner</span>
          </Column>
          <Column align="center" gap="8px">
            <Loader variant="dots" size="md" />
            <span>Dots</span>
          </Column>
          <Column align="center" gap="8px">
            <Loader variant="pulse" size="md" />
            <span>Pulse</span>
          </Column>
          <Column align="center" gap="8px">
            <Loader variant="bars" size="md" />
            <span>Bars</span>
          </Column>
          <Button onClick={() => {
            setPageLoading(true);
            setTimeout(() => setPageLoading(false), 2000);
          }}>
            Show Page Loader
          </Button>
        </Row>
        
        <Row gap="16px" style={{ marginTop: '16px' }}>
          <Skeleton width="200px" height="20px" variant="text" />
          <Skeleton width="50px" height="50px" variant="circular" />
          <Skeleton width="100%" height="80px" variant="rectangular" />
        </Row>
      </Box>

      {/* API Data Demo */}
      <Box title="API Data (useGetData hook)" collapsible>
        <ContentLoader isLoading={isFetching} minHeight="100px">
          {isError ? (
            <Column gap="8px" align="center">
              <span style={{ color: 'var(--color-error)' }}>Error loading data</span>
              <Button size="sm" onClick={refetch}>Retry</Button>
            </Column>
          ) : (
            <Column gap="8px">
              {data?.map((post, index) => (
                <Box key={index} variant="outlined" padding="8px">
                  {post.title}
                </Box>
              ))}
              <Button size="sm" variant="tertiary" onClick={refetch}>
                Refetch
              </Button>
            </Column>
          )}
        </ContentLoader>
      </Box>

      {/* Tree View Demo */}
      <Box title="Tree View (Collapsible)" collapsible>
        <Collapsible title="src" icon={<FolderIcon />} defaultOpen>
          <Collapsible title="components" icon={<FolderIcon />} indent={1}>
            <TreeItem label="Button.tsx" icon={<FileIcon />} indent={2} onClick={() => {}} />
            <TreeItem label="Modal.tsx" icon={<FileIcon />} indent={2} onClick={() => {}} />
            <TreeItem label="Input.tsx" icon={<FileIcon />} indent={2} onClick={() => {}} />
          </Collapsible>
          <Collapsible title="hooks" icon={<FolderIcon />} indent={1}>
            <TreeItem label="useGetData.ts" icon={<FileIcon />} indent={2} onClick={() => {}} />
          </Collapsible>
          <TreeItem label="App.tsx" icon={<FileIcon />} indent={1} onClick={() => {}} />
          <TreeItem label="main.tsx" icon={<FileIcon />} indent={1} onClick={() => {}} />
        </Collapsible>
      </Box>

      {/* Modals */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Standard Modal"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p>This is a standard centered modal with overlay.</p>
        <Input label="Example Input" placeholder="Type something..." fullWidth />
      </Modal>

      <Modal
        isOpen={draggableModalOpen}
        onClose={() => setDraggableModalOpen(false)}
        title="Draggable Modal"
        variant="draggable"
        showOverlay={false}
      >
        <p>This modal can be dragged around and doesn't block the rest of the UI.</p>
      </Modal>

      <Modal
        isOpen={fullscreenModalOpen}
        onClose={() => setFullscreenModalOpen(false)}
        title="Fullscreen Modal"
        variant="fullscreen"
      >
        <Column gap="16px">
          <p>This is a fullscreen modal.</p>
          <Button onClick={() => setFullscreenModalOpen(false)}>Close</Button>
        </Column>
      </Modal>

      <ConfirmDialog
        isOpen={confirmOpen}
        onConfirm={() => {
          showSnackbar({ message: 'Confirmed!', type: 'success', duration: 3000 });
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action? This cannot be undone."
        variant="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Column>
  );
};

// Main App with Sidebar Layout
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme}/>
      <SnackbarProvider>
        <SidebarLayout
          leftSidebar={
            <Sidebar
              position="left"
              defaultWidth={260}
              minWidth={200}
              maxWidth={400}
              collapsible
              resizable
              header={<span style={{ fontWeight: 600 }}>EXPLORER</span>}
            >
              <Collapsible title="PROJECT" defaultOpen>
                <TreeItem label="package.json" icon={<FileIcon />} onClick={() => {}} />
                <TreeItem label="tsconfig.json" icon={<FileIcon />} onClick={() => {}} />
                <TreeItem label="vite.config.ts" icon={<FileIcon />} onClick={() => {}} />
              </Collapsible>
            </Sidebar>
          }
        >
          <DemoContent />
        </SidebarLayout>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;