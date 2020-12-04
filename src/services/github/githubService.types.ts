export interface ICreateRepoRequest {
  /**
   * @description The name of the repository.
   */
  name: string;

  /**
   * @description A short description of the repository.
   */
  description: string;

  /**
   * @description Either true to create a private repository or false to create a public one.
   */
  private: boolean;

  /**
   * @description Can be public or private. If your organization is associated with an enterprise account using GitHub Enterprise Cloud or GitHub Enterprise Server 2.20+, visibility can also be internal. For more information, see "Creating an internal repository".
   The visibility parameter overrides the private parameter when you use both parameters with the nebula-preview preview header.
   */
  visibility?: 'public' | 'private';

  /**
   * @description A URL with more information about the repository.
   */
  homepage?: string;

  /**
   * @description Either true to enable issues for this repository or false to disable them.
   */
  has_issues?: boolean;

  /**
   * @description Either true to enable projects for this repository or false to disable them. Note: If you're creating a repository in an organization that has disabled repository projects, the default is false, and if you pass true, the API returns an error.
   */
  has_projects?: boolean;

  /**
   * @description Either true to enable the wiki for this repository or false to disable it.
   */
  has_wiki?: boolean;

  /**
   * @description Either true to make this repo available as a template repository or false to prevent it.
   */
  is_template?: boolean;

  /**
   * @description The id of the team that will be granted access to this repository. This is only valid when creating a repository in an organization.
   */
  team_id?: number;

  /**
   * @description Pass true to create an initial commit with empty README.
   */
  auto_init?: boolean;

  /**
   * @description Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell".
   */
  gitignore_template?: string;

  /**
   * @description Choose an open source license template that best suits your needs, and then use the license keyword as the license_template string. For example, "mit" or "mpl-2.0".
   */
  license_template?: string;

  /**
   * @description Either true to allow squash-merging pull requests, or false to prevent squash-merging.
   */
  allow_squash_merge?: boolean;

  /**
   * @description Either true to allow merging pull requests with a merge commit, or false to prevent merging pull requests with merge commits.
   */
  allow_merge_commit?: boolean;

  /**
   * @description Either true to allow rebase-merging pull requests, or false to prevent rebase-merging.
   */
  allow_rebase_merge?: boolean;

  /**
   * @description Either true to allow automatically deleting head branches when pull requests are merged, or false to prevent automatic deletion.
   */
  delete_branch_on_merge?: boolean;
}

export interface ICreateRepoResponse {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string;
  hooks_url: string;
  svn_url: string;
  homepage: string;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  is_template: boolean;
  topics: string[]
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: 'public' | 'private';
  pushed_at: string;
  created_at: string;
  updated_at: string;
  permissions: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  }
  allow_rebase_merge: boolean;
  template_repository: string | null;
  temp_clone_token: string;
  allow_squash_merge: boolean;
  delete_branch_on_merge: boolean;
  allow_merge_commit: boolean;
  subscribers_count: number;
  network_count: number;
}

export interface IGithubUserDataResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    private_repos: number;
    collaborators: number;
  }
}
