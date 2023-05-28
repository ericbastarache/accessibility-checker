export interface Report {
    id: number,
    page: string,
    image: string,
    issues?: Array<Issues>,
    issueCount?: Array<IssueCount>,
    openIssues?: Array<Issues>,
    resolvedIssues?: Array<Issues>
}

export interface IssueCount {
    name: string,
    value: number
}

export interface Issues {
    id: number,
    issue: string,
    issueId: number
}