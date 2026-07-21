// =============================================
// DevOps Navigator — Main Application Logic
// =============================================

// ---- State ----
const state = {
  currentSection: 'dashboard',
  completedTopics: JSON.parse(localStorage.getItem('devops_topics') || '[]'),
  notes: JSON.parse(localStorage.getItem('devops_notes') || '[]'),
  activeNote: null,
  currentQuestion: 0,
  score: 0,
  quizAnswered: false,
  cmdFilter: 'all',
  cmdSearch: '',
  streak: parseInt(localStorage.getItem('devops_streak') || '0'),
};

// ---- Roadmap Data ----
const roadmapData = [
  {
    id: 'ph1', phase: '01', cls: 'ph1',
    title: 'Foundation: Linux & Networking',
    desc: 'Operating system basics, commands, networking fundamentals',
    topics: [
      { id: 'linux-basics', text: 'Linux Command Line Basics', tag: '2 weeks' },
      { id: 'file-system', text: 'File System & Permissions', tag: '3 days' },
      { id: 'processes', text: 'Process Management', tag: '3 days' },
      { id: 'networking', text: 'Networking Fundamentals (TCP/IP)', tag: '1 week' },
      { id: 'bash-script', text: 'Bash Scripting', tag: '1 week' },
      { id: 'ssh', text: 'SSH & Remote Access', tag: '2 days' },
      { id: 'cron', text: 'Cron Jobs & Task Scheduling', tag: '2 days' },
      { id: 'vim', text: 'Vim / Nano Editor', tag: '2 days' },
    ]
  },
  {
    id: 'ph2', phase: '02', cls: 'ph2',
    title: 'Version Control: Git & GitHub',
    desc: 'Source code management, collaboration, branching strategies',
    topics: [
      { id: 'git-basics', text: 'Git Basics (init, add, commit)', tag: '3 days' },
      { id: 'branching', text: 'Branching & Merging', tag: '3 days' },
      { id: 'remote-repos', text: 'Remote Repositories', tag: '2 days' },
      { id: 'gitflow', text: 'GitFlow Workflow', tag: '3 days' },
      { id: 'pr-review', text: 'Pull Requests & Code Review', tag: '2 days' },
      { id: 'github-actions', text: 'GitHub Actions (Intro)', tag: '1 week' },
    ]
  },
  {
    id: 'ph3', phase: '03', cls: 'ph3',
    title: 'Containerization: Docker',
    desc: 'Docker images, containers, compose, and registry',
    topics: [
      { id: 'docker-basics', text: 'Docker Concepts & Architecture', tag: '2 days' },
      { id: 'dockerfile', text: 'Writing Dockerfiles', tag: '3 days' },
      { id: 'docker-images', text: 'Building & Managing Images', tag: '3 days' },
      { id: 'docker-compose', text: 'Docker Compose (Multi-container)', tag: '4 days' },
      { id: 'docker-network', text: 'Docker Networking', tag: '3 days' },
      { id: 'docker-volumes', text: 'Volumes & Persistent Storage', tag: '2 days' },
      { id: 'docker-hub', text: 'Docker Hub & Registry', tag: '2 days' },
    ]
  },
  {
    id: 'ph4', phase: '04', cls: 'ph4',
    title: 'CI/CD Pipelines',
    desc: 'Continuous integration, delivery, and deployment automation',
    topics: [
      { id: 'cicd-concepts', text: 'CI/CD Concepts & Benefits', tag: '2 days' },
      { id: 'github-actions-adv', text: 'GitHub Actions (Advanced)', tag: '1 week' },
      { id: 'jenkins', text: 'Jenkins Pipeline', tag: '1 week' },
      { id: 'gitlab-ci', text: 'GitLab CI/CD', tag: '5 days' },
      { id: 'artifacts', text: 'Build Artifacts & Caching', tag: '3 days' },
      { id: 'auto-test', text: 'Automated Testing in Pipeline', tag: '4 days' },
    ]
  },
  {
    id: 'ph5', phase: '05', cls: 'ph5',
    title: 'Cloud & IaC',
    desc: 'AWS/GCP/Azure, Terraform, Ansible, Infrastructure as Code',
    topics: [
      { id: 'cloud-basics', text: 'Cloud Computing Fundamentals', tag: '3 days' },
      { id: 'aws-core', text: 'AWS Core Services (EC2, S3, VPC)', tag: '2 weeks' },
      { id: 'terraform', text: 'Terraform (IaC)', tag: '2 weeks' },
      { id: 'ansible', text: 'Ansible (Configuration Mgmt)', tag: '1 week' },
      { id: 'cloud-sec', text: 'Cloud Security & IAM', tag: '1 week' },
      { id: 'cloud-cost', text: 'Cost Optimization', tag: '3 days' },
    ]
  },
  {
    id: 'ph6', phase: '06', cls: 'ph6',
    title: 'Kubernetes & Monitoring',
    desc: 'Container orchestration, observability, and incident response',
    topics: [
      { id: 'k8s-basics', text: 'Kubernetes Architecture', tag: '3 days' },
      { id: 'k8s-deploy', text: 'Deployments, Services, Pods', tag: '1 week' },
      { id: 'k8s-config', text: 'ConfigMaps & Secrets', tag: '3 days' },
      { id: 'helm', text: 'Helm Charts', tag: '5 days' },
      { id: 'prometheus', text: 'Prometheus & Grafana', tag: '1 week' },
      { id: 'elk', text: 'ELK Stack (Logging)', tag: '1 week' },
      { id: 'alerting', text: 'Alerting & Incident Response', tag: '4 days' },
    ]
  }
];

// ---- Command Data ----
const commandsData = [
  {
    category: 'docker', title: 'Build & Run Container',
    desc: 'Build a Docker image from a Dockerfile and run it as a container',
    code: `<span class="comment"># Build image</span>
<span class="cmd-text">docker build</span> <span class="flag">-t</span> <span class="string">myapp:latest</span> .

<span class="comment"># Run container</span>
<span class="cmd-text">docker run</span> <span class="flag">-d -p</span> <span class="string">8080:80</span> <span class="flag">--name</span> <span class="string">mycontainer</span> myapp`
  },
  {
    category: 'docker', title: 'Docker Compose Up',
    desc: 'Start all services defined in docker-compose.yml',
    code: `<span class="comment"># Start services (detached mode)</span>
<span class="cmd-text">docker compose up</span> <span class="flag">-d</span>

<span class="comment"># View logs</span>
<span class="cmd-text">docker compose logs</span> <span class="flag">-f</span>

<span class="comment"># Stop services</span>
<span class="cmd-text">docker compose down</span>`
  },
  {
    category: 'docker', title: 'Manage Images & Containers',
    desc: 'List, inspect, and remove containers and images',
    code: `<span class="cmd-text">docker ps</span> <span class="flag">-a</span>          <span class="comment"># all containers</span>
<span class="cmd-text">docker images</span>          <span class="comment"># list images</span>
<span class="cmd-text">docker exec</span> <span class="flag">-it</span> <span class="string">myapp</span> bash
<span class="cmd-text">docker rm</span> <span class="flag">-f</span> <span class="string">mycontainer</span>
<span class="cmd-text">docker rmi</span> <span class="string">myapp:latest</span>`
  },
  {
    category: 'docker', title: 'Docker Push to Registry',
    desc: 'Tag and push an image to Docker Hub or a private registry',
    code: `<span class="cmd-text">docker tag</span> <span class="string">myapp user/myapp:v1.0</span>
<span class="cmd-text">docker login</span>
<span class="cmd-text">docker push</span> <span class="string">user/myapp:v1.0</span>
<span class="comment"># Pull from registry</span>
<span class="cmd-text">docker pull</span> <span class="string">user/myapp:v1.0</span>`
  },
  {
    category: 'k8s', title: 'Deploy Application',
    desc: 'Apply a deployment manifest and expose it as a service',
    code: `<span class="comment"># Apply manifest file</span>
<span class="cmd-text">kubectl apply</span> <span class="flag">-f</span> <span class="string">deployment.yaml</span>

<span class="comment"># Expose deployment</span>
<span class="cmd-text">kubectl expose deploy</span> <span class="string">myapp</span> <span class="flag">--port=80</span>

<span class="comment"># Get all resources</span>
<span class="cmd-text">kubectl get</span> <span class="string">all</span> <span class="flag">-n</span> <span class="string">default</span>`
  },
  {
    category: 'k8s', title: 'Debug & Inspect Pods',
    desc: 'Inspect pod logs, describe resources, and exec into pods',
    code: `<span class="cmd-text">kubectl get pods</span> <span class="flag">-o wide</span>
<span class="cmd-text">kubectl logs</span> <span class="flag">-f</span> <span class="string">pod-name</span>
<span class="cmd-text">kubectl describe pod</span> <span class="string">pod-name</span>
<span class="cmd-text">kubectl exec</span> <span class="flag">-it</span> <span class="string">pod-name</span> <span class="flag">--</span> bash
<span class="cmd-text">kubectl delete pod</span> <span class="string">pod-name</span>`
  },
  {
    category: 'k8s', title: 'Scale & Update Deployments',
    desc: 'Scale replicas, rolling updates, and rollback strategies',
    code: `<span class="comment"># Scale deployment</span>
<span class="cmd-text">kubectl scale deploy</span> <span class="string">myapp</span> <span class="flag">--replicas=3</span>

<span class="comment"># Update image (rolling update)</span>
<span class="cmd-text">kubectl set image deploy</span> <span class="string">myapp myapp=myapp:v2</span>

<span class="comment"># Rollback</span>
<span class="cmd-text">kubectl rollout undo deploy</span> <span class="string">myapp</span>`
  },
  {
    category: 'git', title: 'Branching & Workflow',
    desc: 'Create branches, switch, merge, and manage pull requests',
    code: `<span class="cmd-text">git checkout</span> <span class="flag">-b</span> <span class="string">feature/login</span>
<span class="cmd-text">git add</span> . && <span class="cmd-text">git commit</span> <span class="flag">-m</span> <span class="string">"feat: add login"</span>
<span class="cmd-text">git push origin</span> <span class="string">feature/login</span>
<span class="comment"># After PR merge</span>
<span class="cmd-text">git checkout main</span> && <span class="cmd-text">git pull</span>`
  },
  {
    category: 'git', title: 'Git Rebase & History',
    desc: 'Clean history with rebase, squash commits, and cherry-pick',
    code: `<span class="comment"># Interactive rebase (squash commits)</span>
<span class="cmd-text">git rebase</span> <span class="flag">-i</span> <span class="string">HEAD~3</span>

<span class="comment"># Rebase onto main</span>
<span class="cmd-text">git rebase main</span>

<span class="comment"># Cherry-pick a commit</span>
<span class="cmd-text">git cherry-pick</span> <span class="string">abc1234</span>`
  },
  {
    category: 'linux', title: 'File & Directory Operations',
    desc: 'Essential file system commands for Linux/Unix systems',
    code: `<span class="cmd-text">ls</span> <span class="flag">-la</span>                  <span class="comment"># list with details</span>
<span class="cmd-text">find</span> / <span class="flag">-name</span> <span class="string">"*.log"</span>   <span class="comment"># find files</span>
<span class="cmd-text">grep</span> <span class="flag">-r</span> <span class="string">"error"</span> /var/log
<span class="cmd-text">tar</span> <span class="flag">-czf</span> <span class="string">backup.tar.gz</span> ./dir
<span class="cmd-text">chmod</span> <span class="string">755</span> script.sh`
  },
  {
    category: 'linux', title: 'Process & System Management',
    desc: 'Monitor processes, system resources, and services',
    code: `<span class="cmd-text">ps aux</span> <span class="flag">|</span> <span class="cmd-text">grep</span> <span class="string">nginx</span>
<span class="cmd-text">top</span> / <span class="cmd-text">htop</span>             <span class="comment"># resource monitor</span>
<span class="cmd-text">systemctl</span> <span class="string">start nginx</span>
<span class="cmd-text">journalctl</span> <span class="flag">-u</span> <span class="string">nginx</span> <span class="flag">-f</span>
<span class="cmd-text">kill</span> <span class="flag">-9</span> <span class="string">&lt;PID&gt;</span>`
  },
  {
    category: 'linux', title: 'Networking & SSH',
    desc: 'Network diagnostics, SSH connections, and port management',
    code: `<span class="cmd-text">ssh</span> <span class="flag">-i</span> <span class="string">key.pem</span> user@server
<span class="cmd-text">netstat</span> <span class="flag">-tulnp</span>          <span class="comment"># open ports</span>
<span class="cmd-text">curl</span> <span class="flag">-I</span> https://example.com
<span class="cmd-text">scp</span> file.txt user@server:/tmp/
<span class="cmd-text">nmap</span> <span class="flag">-p 1-1000</span> <span class="string">192.168.1.1</span>`
  },
  {
    category: 'cicd', title: 'GitHub Actions Workflow',
    desc: 'Basic CI workflow: build, test, and deploy on push to main',
    code: `<span class="comment"># .github/workflows/ci.yml</span>
<span class="string">on:</span> [push]
<span class="string">jobs:</span>
  <span class="string">build:</span>
    <span class="string">runs-on:</span> ubuntu-latest
    <span class="string">steps:</span>
      - <span class="string">uses:</span> actions/checkout@v3
      - <span class="string">run:</span> docker build . <span class="flag">-t</span> app
      - <span class="string">run:</span> docker push app`
  },
  {
    category: 'cicd', title: 'Jenkins Pipeline Script',
    desc: 'Declarative Jenkinsfile with stages for build, test, deploy',
    code: `<span class="string">pipeline</span> {
  <span class="string">agent any</span>
  <span class="string">stages</span> {
    <span class="string">stage</span>(<span class="flag">'Build'</span>) {
      <span class="string">steps</span> { <span class="cmd-text">sh</span> <span class="string">'docker build .'</span> }
    }
    <span class="string">stage</span>(<span class="flag">'Deploy'</span>) {
      <span class="string">steps</span> { <span class="cmd-text">sh</span> <span class="string">'docker compose up -d'</span> }
    }
  }
}`
  },
  {
    category: 'aws', title: 'AWS CLI Basics',
    desc: 'Common AWS CLI commands for EC2, S3, and EKS',
    code: `<span class="comment"># Configure credentials</span>
<span class="cmd-text">aws configure</span>

<span class="comment"># EC2 instances</span>
<span class="cmd-text">aws ec2 describe-instances</span>

<span class="comment"># S3 operations</span>
<span class="cmd-text">aws s3 cp</span> <span class="string">file.txt s3://my-bucket/</span>

<span class="comment"># EKS cluster</span>
<span class="cmd-text">aws eks update-kubeconfig</span> <span class="flag">--name</span> <span class="string">my-cluster</span>`
  },
  {
    category: 'aws', title: 'Terraform Init & Apply',
    desc: 'Initialize Terraform workspace and apply infrastructure changes',
    code: `<span class="comment"># Initialize</span>
<span class="cmd-text">terraform init</span>

<span class="comment"># Preview changes</span>
<span class="cmd-text">terraform plan</span>

<span class="comment"># Apply changes</span>
<span class="cmd-text">terraform apply</span> <span class="flag">--auto-approve</span>

<span class="comment"># Destroy infra</span>
<span class="cmd-text">terraform destroy</span>`
  },
];

// ---- Quiz Data ----
const quizData = [
  {
    q: 'Docker-এ কোন command দিয়ে একটি running container-এর ভেতরে ঢোকা যায়?',
    options: ['docker enter', 'docker exec -it <id> bash', 'docker attach', 'docker shell'],
    answer: 1,
    explanation: '<strong>docker exec -it &lt;container&gt; bash</strong> command দিয়ে running container-এর shell-এ প্রবেশ করা যায়। "-i" হলো interactive, "-t" হলো pseudo-TTY।'
  },
  {
    q: 'Kubernetes-এ সবচেয়ে ছোট deployable unit কোনটি?',
    options: ['Container', 'Node', 'Pod', 'Service'],
    answer: 2,
    explanation: '<strong>Pod</strong> হলো Kubernetes-এর সবচেয়ে ছোট deployable unit। একটি Pod-এ এক বা একাধিক container থাকতে পারে যারা একই network namespace শেয়ার করে।'
  },
  {
    q: 'CI/CD-এ "CD" এর পূর্ণ অর্থ কী?',
    options: ['Code Deployment', 'Continuous Delivery/Deployment', 'Cloud Distribution', 'Container Delivery'],
    answer: 1,
    explanation: '<strong>Continuous Delivery</strong> (স্বয়ংক্রিয়ভাবে staging পর্যন্ত) এবং <strong>Continuous Deployment</strong> (স্বয়ংক্রিয়ভাবে production পর্যন্ত) — দুটোই CD বোঝায়।'
  },
  {
    q: 'Infrastructure as Code (IaC) এর জন্য সবচেয়ে জনপ্রিয় টুল কোনটি?',
    options: ['Ansible', 'Terraform', 'Chef', 'Puppet'],
    answer: 1,
    explanation: '<strong>Terraform</strong> (HashiCorp) IaC-এর জন্য সবচেয়ে জনপ্রিয়। এটি cloud-agnostic এবং declarative syntax ব্যবহার করে। Ansible configuration management-এর জন্য বেশি ব্যবহৃত হয়।'
  },
  {
    q: 'Docker-এ `EXPOSE` instruction কী করে?',
    options: [
      'Container-এ port খুলে দেয়',
      'Host-এ port publish করে',
      'শুধু documentation হিসেবে port নির্দেশ করে',
      'Firewall rule তৈরি করে'
    ],
    answer: 2,
    explanation: '<strong>EXPOSE</strong> শুধু একটি documentation নির্দেশনা। এটি কোনো port খোলে না। Actual port binding-এর জন্য `docker run -p host:container` ব্যবহার করতে হয়।'
  },
  {
    q: 'Kubernetes-এ `kubectl get pods` command কী দেখায়?',
    options: [
      'শুধু running pods',
      'Default namespace-এর সব pods',
      'সব namespace-এর সব pods',
      'শুধু failed pods'
    ],
    answer: 1,
    explanation: '<strong>kubectl get pods</strong> default namespace-এর pods দেখায়। সব namespace-এর জন্য `kubectl get pods --all-namespaces` বা `-A` flag ব্যবহার করতে হয়।'
  },
  {
    q: 'GitFlow-এ `main` branch-এ সরাসরি কোড push করা কেন ঠিক নয়?',
    options: [
      'main branch read-only',
      'Production code unreviewed হয়ে যাবে, bug ঢুকতে পারে',
      'Git allow করে না',
      'এটা slow process'
    ],
    answer: 1,
    explanation: 'GitFlow-এ main branch production-ready code রাখে। সরাসরি push করলে code review, testing ছাড়াই production-এ যায়, যা <strong>bugs এবং security issues</strong> ঘটাতে পারে।'
  },
  {
    q: 'Prometheus-এ metrics কীভাবে collect হয়?',
    options: ['Push model (app → Prometheus)', 'Pull model (Prometheus → app)', 'WebSocket real-time', 'Message Queue'],
    answer: 1,
    explanation: '<strong>Prometheus Pull model</strong> ব্যবহার করে। Prometheus নিজে configured targets থেকে `/metrics` endpoint-এ HTTP request করে data সংগ্রহ করে। এটি push model থেকে বেশি reliable।'
  },
  {
    q: 'Linux-এ `chmod 755 script.sh` মানে কী?',
    options: [
      'Owner: rwx, Group: r-x, Others: r-x',
      'Owner: rw-, Group: r-x, Others: r-x',
      'সবার জন্য rwx',
      'Owner: rwx, বাকিদের কোনো permission নেই'
    ],
    answer: 0,
    explanation: '<strong>755</strong> = Owner(7=rwx), Group(5=r-x), Others(5=r-x)। Executable script-এর জন্য এটি standard permission। 4=read, 2=write, 1=execute।'
  },
  {
    q: 'Docker Volume এবং Bind Mount-এর পার্থক্য কী?',
    options: [
      'Volume = host path, Mount = container path',
      'Volume = Docker managed storage, Bind Mount = host directory',
      'Volume = temporary, Bind Mount = permanent',
      'কোনো পার্থক্য নেই'
    ],
    answer: 1,
    explanation: '<strong>Docker Volume</strong> Docker নিজে manage করে (`/var/lib/docker/volumes/`)। <strong>Bind Mount</strong> host-এর specific directory কে container-এ map করে। Production-এ Volume preferred।'
  },
];

// ---- Concept Cards Data ----
const conceptsData = [
  {
    emoji: '🐳', title: 'Docker', subtitle: 'Containerization Platform',
    backTitle: 'Docker কী?',
    desc: 'Docker হলো application এবং তার dependencies কে একটি portable container-এ প্যাক করার platform। "Works on my machine" সমস্যার সমাধান।',
    example: 'docker run -d -p 80:80 nginx'
  },
  {
    emoji: '☸️', title: 'Kubernetes', subtitle: 'Container Orchestration',
    backTitle: 'Kubernetes কী?',
    desc: 'অনেক Docker container কে automatically manage, scale, এবং deploy করার system। Production-এ high availability নিশ্চিত করে।',
    example: 'kubectl apply -f deployment.yaml'
  },
  {
    emoji: '🔄', title: 'CI/CD', subtitle: 'Automation Pipeline',
    backTitle: 'CI/CD কী?',
    desc: 'Continuous Integration: code merge করলে automatic build+test। Continuous Delivery/Deployment: automatic staging/production deploy।',
    example: 'git push → build → test → deploy'
  },
  {
    emoji: '🏗️', title: 'IaC', subtitle: 'Infrastructure as Code',
    backTitle: 'IaC কী?',
    desc: 'Server, network, database — সব infrastructure code দিয়ে define করা। Terraform দিয়ে AWS/GCP resources তৈরি করা যায় code থেকে।',
    example: 'terraform apply → AWS EC2 created'
  },
  {
    emoji: '📊', title: 'Monitoring', subtitle: 'Observability Stack',
    backTitle: 'Monitoring কী?',
    desc: 'Application এবং infrastructure এর health, performance, errors track করা। Prometheus metrics collect করে, Grafana দিয়ে visualize করা হয়।',
    example: 'Prometheus + Grafana + AlertManager'
  },
  {
    emoji: '🔐', title: 'DevSecOps', subtitle: 'Security in Pipeline',
    backTitle: 'DevSecOps কী?',
    desc: 'Development এর প্রতিটি ধাপে Security integrate করা। Container vulnerability scan, secrets management, SAST/DAST testing।',
    example: 'trivy scan myimage:latest'
  },
  {
    emoji: '📝', title: 'GitOps', subtitle: 'Git as Single Source',
    backTitle: 'GitOps কী?',
    desc: 'Git repository কে infrastructure এর single source of truth হিসেবে ব্যবহার করা। ArgoCD/Flux দিয়ে Git state → cluster state sync।',
    example: 'git push → ArgoCD → K8s update'
  },
  {
    emoji: '🌐', title: 'Service Mesh', subtitle: 'Microservices Network',
    backTitle: 'Service Mesh কী?',
    desc: 'Microservices-এর মধ্যে communication manage করার infrastructure layer। Istio দিয়ে traffic routing, load balancing, mTLS automatic।',
    example: 'istioctl install --set profile=demo'
  },
];

// =============================================
// Navigation
// =============================================
function navigate(section) {
  state.currentSection = section;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const secEl = document.getElementById('sec-' + section);
  if (secEl) secEl.classList.add('active');
  const navEl = document.querySelector(`[data-nav="${section}"]`);
  if (navEl) navEl.classList.add('active');
  updateHeaderTitle(section);
}

function updateHeaderTitle(section) {
  const titles = {
    dashboard: { h: '📊 Dashboard', p: 'আপনার DevOps learning এর overview' },
    roadmap: { h: '🗺️ Learning Roadmap', p: 'ধাপে ধাপে DevOps শিখুন' },
    commands: { h: '📋 Command Reference', p: 'সব DevOps commands এক জায়গায়' },
    pipeline: { h: '🔄 CI/CD Pipeline', p: 'Pipeline কীভাবে কাজ করে দেখুন' },
    concepts: { h: '💡 Concepts', p: 'DevOps concepts card flip করে শিখুন' },
    quiz: { h: '🧠 Quiz', p: 'নিজেকে test করুন' },
    notes: { h: '📝 Notes', p: 'নিজের notes রাখুন' },
  };
  const t = titles[section] || { h: 'DevOps Navigator', p: '' };
  document.getElementById('header-h').textContent = t.h;
  document.getElementById('header-p').textContent = t.p;
}

// =============================================
// Render Roadmap
// =============================================
function renderRoadmap() {
  const container = document.getElementById('roadmap-container');
  container.innerHTML = '';

  roadmapData.forEach(phase => {
    const completed = phase.topics.filter(t => state.completedTopics.includes(t.id)).length;
    const pct = Math.round((completed / phase.topics.length) * 100);

    const el = document.createElement('div');
    el.className = 'roadmap-phase';
    el.innerHTML = `
      <div class="phase-header" onclick="togglePhase('${phase.id}')">
        <div class="phase-number ${phase.cls}">${phase.phase}</div>
        <div class="phase-info">
          <h3>${phase.title}</h3>
          <p>${phase.desc}</p>
        </div>
        <div class="phase-progress">
          <div class="phase-mini-bar"><div class="phase-mini-fill" style="width:${pct}%"></div></div>
          <div class="phase-pct">${pct}%</div>
        </div>
        <div class="phase-toggle" id="toggle-${phase.id}">▼</div>
      </div>
      <div class="phase-body" id="body-${phase.id}">
        <div class="topics-grid">
          ${phase.topics.map(t => {
            const done = state.completedTopics.includes(t.id);
            return `<div class="topic-item ${done ? 'completed' : ''}" onclick="toggleTopic('${t.id}')" id="topic-${t.id}">
              <div class="topic-checkbox">${done ? '✓' : ''}</div>
              <div class="topic-text">${t.text}</div>
              <div class="topic-tag">${t.tag}</div>
            </div>`;
          }).join('')}
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}

function togglePhase(id) {
  const body = document.getElementById('body-' + id);
  const toggle = document.getElementById('toggle-' + id);
  body.classList.toggle('open');
  toggle.textContent = body.classList.contains('open') ? '▲' : '▼';
}

function toggleTopic(id) {
  const idx = state.completedTopics.indexOf(id);
  if (idx >= 0) state.completedTopics.splice(idx, 1);
  else state.completedTopics.push(id);
  localStorage.setItem('devops_topics', JSON.stringify(state.completedTopics));
  renderRoadmap();
  updateProgress();
  updateStats();
}

function updateProgress() {
  const total = roadmapData.reduce((a, p) => a + p.topics.length, 0);
  const done = state.completedTopics.length;
  const pct = Math.round((done / total) * 100);
  const bar = document.getElementById('sidebar-progress-bar');
  const label = document.getElementById('sidebar-progress-label');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
}

// =============================================
// Render Commands
// =============================================
function renderCommands() {
  const grid = document.getElementById('commands-grid');
  const filtered = commandsData.filter(c => {
    const matchCat = state.cmdFilter === 'all' || c.category === state.cmdFilter;
    const search = state.cmdSearch.toLowerCase();
    const matchSearch = !search || c.title.toLowerCase().includes(search) || c.desc.toLowerCase().includes(search) || c.code.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if (!filtered.length) {
    grid.innerHTML = '<div style="color:var(--text-muted);font-size:15px;padding:40px;text-align:center;">কোনো command পাওয়া যায়নি 🔍</div>';
    return;
  }

  const cats = { docker: 'Docker', k8s: 'Kubernetes', git: 'Git', linux: 'Linux', cicd: 'CI/CD', aws: 'AWS/IaC' };

  grid.innerHTML = filtered.map((c, i) => `
    <div class="cmd-card">
      <div class="cmd-card-header">
        <span class="cmd-category-badge badge-${c.category}">${cats[c.category]}</span>
        <span class="cmd-card-title">${c.title}</span>
      </div>
      <div class="cmd-body">
        <p class="cmd-desc">${c.desc}</p>
        <div class="code-block">
          <button class="copy-btn" onclick="copyCode(this, ${i})" id="copy-btn-${i}">📋 Copy</button>
          ${c.code}
        </div>
      </div>
    </div>
  `).join('');
}

function copyCode(btn, idx) {
  const filtered = commandsData.filter(c => {
    const matchCat = state.cmdFilter === 'all' || c.category === state.cmdFilter;
    const search = state.cmdSearch.toLowerCase();
    const matchSearch = !search || c.title.toLowerCase().includes(search) || c.desc.toLowerCase().includes(search) || c.code.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });
  const raw = filtered[idx]?.code.replace(/<[^>]+>/g, '') || '';
  navigator.clipboard.writeText(raw).then(() => {
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '📋 Copy'; btn.classList.remove('copied'); }, 2000);
  });
}

function setCmdFilter(cat) {
  state.cmdFilter = cat;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-cat="${cat}"]`)?.classList.add('active');
  renderCommands();
}

// =============================================
// Render Concepts
// =============================================
function renderConcepts() {
  const grid = document.getElementById('concepts-grid');
  grid.innerHTML = conceptsData.map((c, i) => `
    <div class="concept-card-wrapper" onclick="flipCard(${i})" id="concept-wrapper-${i}">
      <div class="concept-card" id="concept-card-${i}">
        <div class="concept-front">
          <div class="concept-emoji">${c.emoji}</div>
          <div class="concept-title">${c.title}</div>
          <div class="concept-subtitle">${c.subtitle}</div>
          <div class="flip-hint">👆 hover করুন বা click করুন</div>
        </div>
        <div class="concept-back">
          <h4>${c.backTitle}</h4>
          <p>${c.desc}</p>
          <div class="example">${c.example}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function flipCard(i) {
  document.getElementById('concept-wrapper-' + i)?.classList.toggle('flipped');
}

// =============================================
// Quiz
// =============================================
function renderQuiz() {
  const q = quizData[state.currentQuestion];
  const letters = ['A', 'B', 'C', 'D'];
  document.getElementById('quiz-num').textContent = `প্রশ্ন ${state.currentQuestion + 1} / ${quizData.length}`;
  document.getElementById('quiz-score-display').textContent = `${state.score}/${quizData.length}`;
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('quiz-explanation').classList.remove('show');
  document.getElementById('quiz-explanation').innerHTML = '';
  state.quizAnswered = false;

  const opts = document.getElementById('options-grid');
  opts.innerHTML = q.options.map((opt, i) => `
    <button class="option-btn" onclick="answerQuiz(${i})" id="opt-${i}">
      <span class="option-letter">${letters[i]}</span>
      ${opt}
    </button>
  `).join('');
}

function answerQuiz(chosen) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;
  const q = quizData[state.currentQuestion];
  const correct = q.answer;

  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === correct) btn.classList.add('correct');
    else if (i === chosen) btn.classList.add('wrong');
  });

  if (chosen === correct) state.score++;
  document.getElementById('quiz-score-display').textContent = `${state.score}/${quizData.length}`;

  const expl = document.getElementById('quiz-explanation');
  expl.innerHTML = `💡 ${q.explanation}`;
  expl.classList.add('show');
}

function nextQuestion() {
  if (!state.quizAnswered && state.currentQuestion < quizData.length) {
    alert('প্রথমে একটি উত্তর বেছে নিন!');
    return;
  }
  if (state.currentQuestion < quizData.length - 1) {
    state.currentQuestion++;
    renderQuiz();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const pct = Math.round((state.score / quizData.length) * 100);
  const grade = pct >= 80 ? '🏆 Excellent!' : pct >= 60 ? '👍 Good Job!' : '📚 আরো পড়ুন!';
  document.getElementById('quiz-area').innerHTML = `
    <div class="question-card" style="text-align:center;padding:60px 32px;">
      <div style="font-size:64px;margin-bottom:20px;">${grade.split(' ')[0]}</div>
      <h2 style="font-size:24px;font-weight:800;color:var(--text-primary);margin-bottom:8px;">${grade}</h2>
      <div style="font-size:48px;font-weight:800;font-family:'JetBrains Mono',monospace;color:var(--accent-green);margin:16px 0;">${pct}%</div>
      <p style="color:var(--text-secondary);font-size:15px;">${state.score}/${quizData.length} সঠিক উত্তর</p>
      <button class="quiz-btn" onclick="restartQuiz()" style="margin-top:28px;">🔄 আবার চেষ্টা করুন</button>
    </div>
  `;
}

function restartQuiz() {
  state.currentQuestion = 0;
  state.score = 0;
  state.quizAnswered = false;
  document.getElementById('quiz-area').innerHTML = `
    <div class="question-card">
      <div class="question-num" id="quiz-num"></div>
      <div class="question-text" id="question-text"></div>
      <div class="options-grid" id="options-grid"></div>
      <div class="quiz-explanation" id="quiz-explanation"></div>
    </div>
    <div class="quiz-nav">
      <button class="quiz-btn" onclick="nextQuestion()">পরের প্রশ্ন →</button>
    </div>
  `;
  renderQuiz();
}

// =============================================
// Notes
// =============================================
function renderNotesList() {
  const list = document.getElementById('notes-list');
  const saved = state.notes;
  if (!saved.length) {
    list.innerHTML = '<div style="font-size:13px;color:var(--text-muted);text-align:center;padding:20px;">কোনো note নেই।<br>নতুন note তৈরি করুন!</div>';
    return;
  }
  list.innerHTML = saved.map((n, i) => `
    <div class="note-item ${state.activeNote === i ? 'active' : ''}" onclick="openNote(${i})">
      <div class="note-item-title">${n.title || 'Untitled Note'}</div>
      <div class="note-item-date">${n.date}</div>
    </div>
  `).join('');
}

function openNote(i) {
  state.activeNote = i;
  const note = state.notes[i];
  document.getElementById('note-title').value = note.title || '';
  document.getElementById('note-body').value = note.body || '';
  renderNotesList();
}

function newNote() {
  const note = { title: '', body: '', date: new Date().toLocaleDateString('bn-BD') };
  state.notes.unshift(note);
  state.activeNote = 0;
  localStorage.setItem('devops_notes', JSON.stringify(state.notes));
  renderNotesList();
  document.getElementById('note-title').value = '';
  document.getElementById('note-body').value = '';
  document.getElementById('note-title').focus();
}

function saveNote() {
  if (state.activeNote === null) { newNote(); return; }
  state.notes[state.activeNote].title = document.getElementById('note-title').value || 'Untitled';
  state.notes[state.activeNote].body = document.getElementById('note-body').value;
  state.notes[state.activeNote].date = new Date().toLocaleDateString('bn-BD');
  localStorage.setItem('devops_notes', JSON.stringify(state.notes));
  renderNotesList();
  showToast('Note সংরক্ষিত হয়েছে ✅');
}

function deleteNote() {
  if (state.activeNote === null) return;
  state.notes.splice(state.activeNote, 1);
  state.activeNote = null;
  localStorage.setItem('devops_notes', JSON.stringify(state.notes));
  document.getElementById('note-title').value = '';
  document.getElementById('note-body').value = '';
  renderNotesList();
}

// =============================================
// Dashboard Stats Update
// =============================================
function updateStats() {
  const total = roadmapData.reduce((a, p) => a + p.topics.length, 0);
  const done = state.completedTopics.length;
  const pct = Math.round((done / total) * 100);
  const el = document.getElementById('stat-progress');
  if (el) el.textContent = pct + '%';
  const el2 = document.getElementById('stat-topics');
  if (el2) el2.textContent = done + '/' + total;
}

// =============================================
// Clock
// =============================================
function updateClock() {
  const now = new Date();
  const t = now.toLocaleTimeString('en-GB');
  const el = document.getElementById('clock');
  if (el) el.textContent = t;
}

// =============================================
// Toast Notification
// =============================================
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed;bottom:28px;right:28px;z-index:9999;
      background:rgba(0,255,136,0.12);border:1px solid rgba(0,255,136,0.3);
      color:var(--accent-green);padding:14px 22px;border-radius:10px;
      font-size:14px;font-weight:600;backdrop-filter:blur(20px);
      transform:translateY(100px);opacity:0;transition:all 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  setTimeout(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; }, 10);
  setTimeout(() => { toast.style.transform = 'translateY(100px)'; toast.style.opacity = '0'; }, 2500);
}

// =============================================
// Tips Rotation
// =============================================
const tips = [
  { icon: '💡', title: 'আজকের Tip', text: 'Docker container বন্ধ হলেও data থাকে না — সবসময় Volume ব্যবহার করুন persistent data-র জন্য।' },
  { icon: '🚀', title: 'Best Practice', text: 'Dockerfile-এ সবসময় specific version use করুন। `FROM node:latest` এর বদলে `FROM node:20-alpine` use করুন।' },
  { icon: '🔐', title: 'Security Tip', text: 'কখনো secrets (passwords, API keys) কোডে বা Dockerfile-এ রাখবেন না। Environment variables বা secret managers ব্যবহার করুন।' },
  { icon: '⚡', title: 'Performance Tip', text: 'Kubernetes-এ Resource Limits (CPU/Memory) সবসময় set করুন। না হলে একটি pod পুরো node-এর resource নিয়ে নিতে পারে।' },
  { icon: '🛠️', title: 'DevOps Principle', text: '"Everything as Code" — infrastructure, configuration, pipeline সব কিছু code হিসেবে Git-এ রাখুন।' },
];

let tipIdx = 0;
function rotateTip() {
  tipIdx = (tipIdx + 1) % tips.length;
  const t = tips[tipIdx];
  const el = document.getElementById('daily-tip');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => {
      el.querySelector('.tip-icon').textContent = t.icon;
      el.querySelector('h4').textContent = t.title;
      el.querySelector('p').textContent = t.text;
      el.style.opacity = '1';
    }, 300);
  }
}

// =============================================
// Initialize
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  navigate('dashboard');
  renderRoadmap();
  renderCommands();
  renderConcepts();
  renderNotesList();
  renderQuiz();
  updateProgress();
  updateStats();
  updateClock();

  setInterval(updateClock, 1000);
  setInterval(rotateTip, 6000);

  // Search
  const searchInput = document.getElementById('cmd-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.cmdSearch = e.target.value;
      renderCommands();
    });
  }

  // Auto-save notes on typing
  document.getElementById('note-title')?.addEventListener('input', () => {
    if (state.activeNote !== null) {
      state.notes[state.activeNote].title = document.getElementById('note-title').value;
      renderNotesList();
    }
  });

  document.getElementById('note-body')?.addEventListener('input', () => {
    if (state.activeNote !== null) {
      state.notes[state.activeNote].body = document.getElementById('note-body').value;
    }
  });
});
