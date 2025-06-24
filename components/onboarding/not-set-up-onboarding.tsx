"use client"

import { Button } from "../ui/button"
import { useState } from "react"
import { Bell, Check, Dot, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { cn } from "@/lib/utils"
import useFinishedSteps from "./use-finished-steps"

type Step = 'create-product' | 'create-feedback' | 'create-widget' | 'embed-widget' | 'create-changelog' | 'setup-product-info';

export default function NotSetUpOnboarding() {
    const [isOpen, setIsOpen] = useState(false)
    const {steps, isLoading: stepsLoading, productIds, isFinished} = useFinishedSteps()
    
    if (stepsLoading || isFinished) return null;
    
    // Define the step order
    const stepOrder: Step[] = [
        'create-product',
        'create-feedback', 
        'create-widget',
        'embed-widget',
        'create-changelog',
        'setup-product-info'
    ];

    // Check if a task is done based on the steps
    const isTaskDone = (taskIndex: number): boolean => {
        if (taskIndex < 0 || taskIndex >= stepOrder.length) return false; // Substract 1 for the index and 1 for the BOOM task
        const stepName = stepOrder[taskIndex];
        
        
        return steps.includes(stepName);
    };

    const tasks = [
        {
            title: "Create a product",
            done: isTaskDone(0),
            targetIds: "new-product-button",
            href: "/products/new",
            steps: [
                {
                    title: "Click on New product",
                },
                {
                    title: "Fill the form with your product data",
                },
                {
                    title: "Click Submit"
                }
            ]
        },
        {
            title: "Create a feedback",
            done: isTaskDone(1),
            targetIds: ["open-feedback-page", "new-feedback-button"],
            hrefs: [`/products/${productIds[0]}`, `/${productIds[0]}`],
            steps: [
                {
                    title: "Open your product dashboard",
                },
                {
                    title: "Click on View Page at the top right"
                },
                {
                    title: "Click on Submit feedback",
                },
                {
                    title: "Fill the form with your feedback",
                },
                {
                    title: "Click Send"
                }
            ],
        },
        {
            title: "Create a widget",
            done: isTaskDone(2),
            targetIds: ["components-tab", "all-components-button", "float-button"],
            hrefs: [`/products/${productIds[0]}`],
            steps: [
                {
                    title: "Open your product dashboard",
                },
                {
                    title: "Click on Widgets",
                },
                {
                    title: "Click on All Components",
                },
                {
                    title: "Click on Add Component",
                },
                {
                    title: "Name and describe your component in the form"
                },
                {
                    title: "Customize the component as you need"
                },
                {
                    title: "Fill the form with your widget data",
                }
            ],
        },
        {
            title: "Embed your widget",
            done: isTaskDone(3),
            desc: "Embed your widget to get started with Floopr",
            steps: [
                {
                    title: "Copy your widget's script",
                },
                {
                    title: "Add the script to your website",
                }
            ],
        },
        {
            title: "Add your first Changelog",
            done: isTaskDone(4),
            desc: "Add your first changelog to notify your users with changes",
            steps: [
                {
                    title: "Open your product dashboard",
                },
                {
                    title: "Click on Changelogs",
                },
                {
                    title: "Click on Add changelog",
                },
                {
                    title: "Fill the form with your changelog data",
                    desc: "Note: Changelogs will be created automatically when you change the of any feedback you get"
                }
            ],
            targetId: "new-changelog-button",
            href: "/changelogs/new"
        },
        {
            title: "Setup product info",
            done: isTaskDone(5),
            desc: "Setup product info to get started with Floopr",
            steps: [
                {
                    title: "Open your product dashboard",
                },
                {
                    title: "Click on Settings",
                },
                {
                    title: "Add product context and description",
                    desc: "Note: Reload the page to see the changes",
                }
            ],
            targetId: "product-settings-button",
            href: "/products"
        },
        {
            title: "BOOM! You are set up",
            done: false, // All steps completed
            desc: "BOOM! You are set up to get started with Floopr",
            steps: [
                {
                    title: "All setup steps completed!",
                    desc: "You've successfully completed all the setup steps.",
                },
                {
                    title: "Start using Floopr",
                    desc: "You can now start using all the features of Floopr.",
                }
            ],
            targetId: "dashboard-button",
            href: "/dashboard"
        }
    ]

    tasks[6].done = tasks.filter(task => task.done).length === 6; 

    // Calculate completion percentage
    const completedTasks = tasks.filter(task => task.done).length; // Subtract 1 for the "BOOM" task
    const totalTasks = tasks.length; // Subtract 1 for the "BOOM" task
    const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
    
    
    

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild className="fixed bottom-4 right-4">
                <Button variant="outline" size={"sm"} className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <span>{completionPercentage}%</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="shadow-lg rounded-lg p-4 w-96">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Get started with Floopr</h3>
                    <div className="text-sm text-gray-600">{completedTasks}/{totalTasks} completed</div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full rounded-full h-2 mb-4">
                    <div 
                        className={cn("h-2 rounded-full transition-all duration-300",
                            completionPercentage < 35 && "bg-red-500",
                            completionPercentage >= 35 && completionPercentage < 60 && "bg-yellow-500",
                            completionPercentage >= 60 && completionPercentage < 85 && "bg-blue-500",
                            completionPercentage >= 85 && "bg-green-500"
                        )}
                        style={{ width: `${completionPercentage}%` }}
                    ></div>
                </div>

                <Accordion type="multiple">
                    {tasks.map((task, index) => (
                        <AccordionItem value={task.title} key={index} className="shadow-sm rounded-lg">
                            <AccordionTrigger className="flex items-center justify-between px-4 py-2">
                                <span className="flex items-center gap-2">
                                    {task.done ? 
                                        <Check className="w-5 h-5 text-green-500 p-1 border border-green-500 rounded-full"  /> : 
                                        <X className="w-5 h-5 text-red-500 p-1 border border-red-500 rounded-full"/>
                                    }
                                    <span className={cn("text-sm font-medium", task.done && "line-through text-gray-500")}>
                                        {task.title}
                                    </span>
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 py-2">
                                <p className="text-sm text-gray-600 mb-2">{task.desc}</p>
                                <ul className="space-y-1">
                                    {task.steps.map((step, stepIndex) => (
                                        <li key={stepIndex} className="flex items-start gap-2 text-sm">
                                            {task.done ? 
                                                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> : 
                                                <Dot className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            }
                                            <div>
                                                <div className={cn("font-medium", task.done && "line-through text-gray-500")}>
                                                    {step.title}
                                                </div>
                                                <div className="text-gray-500 text-xs">{step.desc}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {!task.done && task.href && (
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="mt-3"
                                        onClick={() => window.location.href = task.href}
                                    >
                                        Go to {task.title.toLowerCase()}
                                    </Button>
                                )}
                                
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                
                {completionPercentage === 100 ? (
                    <Button variant="default" className="mt-4 w-full bg-green-600 hover:bg-green-700">
                        🎉 Setup Complete! Start Using Floopr
                    </Button>
                ) : (
                    <Button variant="default" className="mt-4 w-full">
                        Continue Setup ({completedTasks}/{totalTasks})
                    </Button>
                )}
            </PopoverContent>
        </Popover>
    )
}