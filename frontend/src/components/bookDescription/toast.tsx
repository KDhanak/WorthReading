import React, { useEffect, useState } from "react";
import { TbShoppingCartCheck } from "react-icons/tb";
import { TbShoppingCartX } from "react-icons/tb";



interface ToastProps {
    message: { success: boolean; message: string } | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {

    return (
        <>
            <div className={`flex min-w-72 justify-between items-center rounded-lg border-2 ${message ? (message.success ? ('border-green-600') : ('border-red-600')) : (null)} bg-primary_1 p-2`}>
                <div className="flex items-center rounded-lg">
                    {message ? (
                        message.success ? (
                            <TbShoppingCartCheck className="size-7 text-green-600" />
                        ) : (
                            <TbShoppingCartX className="size-7 text-red-600" />

                        )
                    ) : null}
                </div>
                <div className="flex w-full justify-between ml-6">
                    <div className="flex flex-col">
                        {message ? (
                            message.success ? (
                                <h6 className="text-base font-semibold text-green-600">Success</h6>
                            ) : (
                                <h6 className="text-base font-semibold text-red-600">Oops!!</h6>
                            )
                        ) : null}

                        {message?.message && (
                            <p className="text-sm text-body-color">{message.message}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="relative w-full h-1 mt-1 bg-gray-200 rounded">
                <div
                    className={`absolute top-0 left-0 h-full ${message?.success ? 'bg-green-600' : 'bg-red-600'} rounded animate-progress`}
                    style={{
                        animation: "progress 3s linear forwards",
                    }}
                ></div>
            </div>
        </>
    );
}

export default Toast;
