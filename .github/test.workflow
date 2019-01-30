workflow "Test workflow" {
  on = "push"
  resolves = ["Create an issue"]
}

action "Test-Github-Actions" {
  uses = "actions/bin/filter@test-github-actions"
  args = "branch test-github-actions"
}

action "Create an issue" {
  uses = "JasonEtco/create-an-issue@11c8e67a9a77b755021d8349484be7dd2c3092ce"
  secrets = ["GITHUB_TOKEN"]
}
