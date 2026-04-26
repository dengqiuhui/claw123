"use client";

import { useState } from "react";
import { User, Download, Sparkles, ChevronRight, ArrowLeft, CheckCircle2, LayoutDashboard, BookOpen, Layers } from "lucide-react";

type UserType = "new" | "installed" | null;
type FlowStep = "identity" | "comparison" | "detail" | "skillhub";

interface OpenClawClient {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
}

const openClawClients: OpenClawClient[] = [
  {
    id: "claw-desktop",
    name: "OpenClaw Desktop",
    description: "桌面版 OpenClaw 客户端",
    features: ["完整功能", "本地运行", "高度可定制", "插件支持"],
    icon: "💻",
    color: "bg-blue-500",
  },
  {
    id: "claw-web",
    name: "OpenClaw Web",
    description: "网页版 OpenClaw 客户端",
    features: ["无需安装", "跨平台访问", "云端同步", "即时使用"],
    icon: "🌐",
    color: "bg-green-500",
  },
  {
    id: "claw-mobile",
    name: "OpenClaw Mobile",
    description: "移动版 OpenClaw 客户端",
    features: ["随身携带", "触控优化", "离线可用", "推送通知"],
    icon: "📱",
    color: "bg-purple-500",
  },
];

const skills: Skill[] = [
  {
    id: "skill-1",
    name: "代码助手",
    description: "智能代码补全和审查",
    category: "开发",
    icon: "⌨️",
  },
  {
    id: "skill-2",
    name: "文档生成",
    description: "自动生成项目文档",
    category: "工具",
    icon: "📝",
  },
  {
    id: "skill-3",
    name: "数据分析",
    description: "快速分析数据趋势",
    category: "数据",
    icon: "📊",
  },
  {
    id: "skill-4",
    name: "翻译助手",
    description: "多语言翻译支持",
    category: "语言",
    icon: "🌍",
  },
];

export default function Home() {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentStep, setCurrentStep] = useState<FlowStep>("identity");
  const [selectedClient, setSelectedClient] = useState<OpenClawClient | null>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    if (type === "new") {
      setCurrentStep("comparison");
    } else {
      setCurrentStep("skillhub");
    }
  };

  const handleClientSelect = (client: OpenClawClient) => {
    setSelectedClient(client);
    setCurrentStep("detail");
  };

  const handleBack = () => {
    if (currentStep === "comparison") {
      setUserType(null);
      setCurrentStep("identity");
    } else if (currentStep === "detail") {
      setSelectedClient(null);
      setCurrentStep("comparison");
    } else if (currentStep === "skillhub") {
      setUserType(null);
      setCurrentStep("identity");
    }
  };

  const getStepIndicator = () => {
    if (currentStep === "identity") return null;

    const steps = userType === "new"
      ? [
        { name: "身份选择", active: true, completed: true },
        { name: "客户端对比", active: currentStep === "comparison", completed: currentStep === "detail" },
        { name: "客户端详情", active: currentStep === "detail", completed: false },
      ]
      : [
        { name: "身份选择", active: true, completed: true },
        { name: "SkillHub", active: currentStep === "skillhub", completed: false },
      ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex items-center">
                {step.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step.active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                  >
                    {index + 1}
                  </div>
                )}
                <span className={`ml-2 text-sm ${step.active ? "font-medium text-gray-900" : "text-gray-500"}`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && <ChevronRight className="w-4 h-4 mx-4 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">OpenClaw</h1>
              <div className="hidden md:flex space-x-1">
                <button className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  OpenClaw 部署客户端
                </button>
                <button className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center">
                  <Layers className="w-4 h-4 mr-2" />
                  SkillHub
                </button>
                <button className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  知识中心
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                登录
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">OpenClaw</h1>
          <p className="text-lg text-gray-600">欢迎使用 OpenClaw 智能助手平台</p>
        </div>

        {getStepIndicator()}

        {currentStep !== "identity" && (
          <button
            onClick={handleBack}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回上一步
          </button>
        )}

        {currentStep === "identity" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">选择您的身份</h2>
              <p className="text-gray-600">告诉我们您是谁，以便我们为您提供更好的服务</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => handleUserTypeSelect("new")}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">新手用户</h3>
                    <p className="text-sm text-gray-500">刚刚接触 OpenClaw</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  浏览热门 OpenClaw 客户端，了解不同版本的功能对比，选择最适合您的版本开始体验。
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  开始探索
                  <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => handleUserTypeSelect("installed")}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-green-500"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">已安装用户</h3>
                    <p className="text-sm text-gray-500">已经在使用 OpenClaw</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  直接进入 SkillHub，浏览和安装各种智能技能，提升您的工作效率和创作能力。
                </p>
                <div className="flex items-center text-green-600 font-medium">
                  进入 SkillHub
                  <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        )}

        {currentStep === "comparison" && userType === "new" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">选择适合您的 OpenClaw 客户端</h2>
              <p className="text-gray-600">比较不同版本的功能，选择最适合您的解决方案</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {openClawClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => handleClientSelect(client)}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-blue-500"
                >
                  <div className={`w-16 h-16 ${client.color} rounded-xl flex items-center justify-center mb-4 text-3xl`}>
                    {client.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{client.name}</h3>
                  <p className="text-gray-600 mb-4">{client.description}</p>
                  <ul className="space-y-2 mb-4">
                    {client.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center text-blue-600 font-medium">
                    查看详情
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === "detail" && selectedClient && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start mb-6">
                <div className={`w-20 h-20 ${selectedClient.color} rounded-xl flex items-center justify-center mr-6 text-4xl`}>
                  {selectedClient.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedClient.name}</h2>
                  <p className="text-lg text-gray-600">{selectedClient.description}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">核心功能</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedClient.features.map((feature, index) => (
                    <div key={index} className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-blue-500 mr-3" />
                      <span className="text-gray-800 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">立即开始</h3>
                <p className="text-gray-600 mb-4">
                  点击下方按钮开始下载和安装 {selectedClient.name}，开启您的智能助手之旅。
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  下载 {selectedClient.name}
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === "skillhub" && userType === "installed" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">SkillHub</h2>
              <p className="text-gray-600">浏览和安装各种智能技能，提升您的工作效率</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-green-500"
                >
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{skill.description}</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {skill.category}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">想要更多技能？</p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                浏览全部技能
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
