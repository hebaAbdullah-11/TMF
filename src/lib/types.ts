export interface WebsiteResource {
  name: string
  url: string
  description: string
}

export interface RoadmapResources {
  youtube: string[]
  websites: WebsiteResource[]
}

export interface RoadmapResponse {
  summary: string
  steps: string[]
  resources: RoadmapResources
  closing: string
}

export interface UserAnswers {
  q1: string
  q2: string
  q3: string
}
