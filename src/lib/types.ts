export interface WebsiteResource {
  name: string
  url: string
  description: string
}

export interface RoadmapStep {
  title: string
  description: string
  duration: string
  micro_actions: string[]
}

export interface RoadmapResources {
  youtube: string[]
  websites: WebsiteResource[]
}

export interface RoadmapResponse {
  summary: string
  steps: RoadmapStep[]
  resources: RoadmapResources
  closing: string
}

export interface UserAnswers {
  q1: string
  q2: string
  q3: string
}
