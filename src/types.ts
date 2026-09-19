export type NavTab = 'dashboard' | 'scraper' | 'issues' | 'tests' | 'pins';

export type PersonaId = 
  | 'standard_user' 
  | 'problem_user' 
  | 'locked_out_user' 
  | 'performance_glitch_user' 
  | 'error_user' 
  | 'visual_user';

export type IssueSeverity = 'Critical' | 'Major' | 'Minor';
export type IssueStatus = 'Open' | 'In Progress' | 'Fixed';

export interface ScraperDetectionRules {
  brokenImages: boolean;
  duplicateImageHash: boolean;
  zeroPrices: boolean;
  missingTitlesOrDescriptions: boolean;
  deadLinks: boolean;
}

export interface ScrapedProduct {
  id: string;
  itemId: number;
  name: string;
  description: string;
  price: number;
  priceFormatted: string;
  imageUrl: string;
  imageAlt: string;
  flagged: boolean;
  badges: Array<{
    type: 'broken' | 'reused' | 'price' | 'pass';
    label: string;
  }>;
  statusText?: string;
  isPriceStriked?: boolean;
}

export interface DefectItem {
  id: string;
  title: string;
  area: string;
  persona: string;
  seenTime: string;
  firstSeen: string;
  severity: IssueSeverity;
  status: IssueStatus;
  locatorError: string;
  expected: string;
  actual: string;
  steps: string[];
  playwrightCode: string;
  jsonPayload: Record<string, any>;
}

export interface TestStep {
  stepNumber: number;
  status: 'PASS' | 'ERROR' | 'FAIL';
  command: string;
  highlightArg?: string;
  durationMs: number;
  note?: string;
}

export interface TestSuite {
  id: string;
  title: string;
  specPath: string;
  passRatio: string;
  duration: string;
  status: 'pass' | 'fail';
  subtitle?: string;
  steps: TestStep[];
  stackTrace?: string;
  domSnapshot?: string;
  screenshotUrl?: string;
  hotspotLabel?: string;
}

export interface ReviewPin {
  id: number;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  severityClass: string;
  badgeBg: string;
  selector: string;
  targetUrl: string;
  author: string;
  timestamp: string;
  tag: string;
  page: string;
}
