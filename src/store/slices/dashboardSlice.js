import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  metrics: {
    totalUsers: 130,
    totalReviewers: 64,
    totalAuditors: 55,
    totalOrganizations: 25,
    totalAudits: 245,
    completed: 180,
    inProgress: 45,
    pendingReview: 20,
    auditsChange: 12,
    completedChange: 8,
    progressChange: -3,
    reviewChange: 15,
  },
  filters: {
    department: '',
    region: '',
    country: '',
  },
  loading: false,
  error: null,
  sidebarOpen: window.innerWidth >= 1024, // Default open on desktop, closed on mobile
  auditorStatus: {
    autoSubmitted: 50,
    approvalInProgress: 30,
    approved: 30,
    approvalPending: 20,
  },
  reviewerStatus: {
    autoSubmitted: 50,
    approvalInProgress: 30,
    approved: 30,
    approvalPending: 20,
  },
  checksheetStatus: {
    reviewed: 30,
    completed: 20,
    pending: 20,
    alloted: 50,
  },
  auditsData: [
    {
      id: 1,
      dealerCode: '1',
      dealerName: 'Pawan Automobiles',
      auditorStatus: 'Completed',
      reviewerStatus: 'In Progress',
      score: 85,
      actionPlanOpen: 3,
      actionPlanClosed: 7,
      actionPlanSummary: 'Critical issues resolved'
    },
    {
      id: 2,
      dealerCode: '2',
      dealerName: 'Shekhavat Motors',
      auditorStatus: 'Yet to Start',
      reviewerStatus: 'Approval Pending',
      score: 92,
      actionPlanOpen: 1,
      actionPlanClosed: 5,
      actionPlanSummary: 'Minor improvements needed'
    },
    {
      id: 3,
      dealerCode: '3',
      dealerName: 'Aryan Automobiles',
      auditorStatus: 'Completed',
      reviewerStatus: 'Yet to Start',
      score: 78,
      actionPlanOpen: 5,
      actionPlanClosed: 3,
      actionPlanSummary: 'Infrastructure upgrades required'
    },
    {
      id: 4,
      dealerCode: '4',
      dealerName: 'Downtown Motors',
      auditorStatus: 'Completed',
      reviewerStatus: 'Yet to Start',
      score: 88,
      actionPlanOpen: 2,
      actionPlanClosed: 6,
      actionPlanSummary: 'Process improvements implemented'
    },
    {
      id: 5,
      dealerCode: '5',
      dealerName: 'Deccon Motors',
      auditorStatus: 'Yet to Start',
      reviewerStatus: 'Yet to Start',
      score: 90,
      actionPlanOpen: 1,
      actionPlanClosed: 4,
      actionPlanSummary: 'Excellent compliance'
    },
    {
      id: 6,
      dealerCode: '6',
      dealerName: 'Speedo Automobile',
      auditorStatus: 'Yet to Start',
      reviewerStatus: 'Yet to Start',
      score: 82,
      actionPlanOpen: 4,
      actionPlanClosed: 4,
      actionPlanSummary: 'Documentation updates needed'
    }
  ],
  filters: {
    department: '',
    region: '',
    country: '',
  },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateMetrics: (state, action) => {
      state.metrics = { ...state.metrics, ...action.payload };
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setFilters, setLoading, setError, updateMetrics, toggleSidebar } = dashboardSlice.actions;
export default dashboardSlice.reducer;
