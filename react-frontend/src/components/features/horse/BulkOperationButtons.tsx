import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { ExecuteType } from "./type/ExecuteType";
import { Horse } from "../../../domain/models/Horse";
import { FavoriteHorseService } from '../../../infrastructure/holder/FavoriteHorseService';

type Props = {
    horses: Horse[];
    onUpdate: () => void;
  };

export const BulkOperationButtons = ({ horses, onUpdate }: Props) => {
    const favoriteService = FavoriteHorseService.getInstance();
    const [isConfirmDialog, setIsConfirmDialog] = useState(false);
    const [executeType, setExecuteType] = useState<ExecuteType>({bulkType:"None"});

    if(horses.length === 0) return null;

    // ボタン操作ハンドラ
    const handleBulkRegister = () => {
        setExecuteType({bulkType:"BulkRegistration"});
        setIsConfirmDialog(true);
    };

    const handleBulkUnregister = () => {
        setExecuteType({bulkType:"BulkCancellation"});
        setIsConfirmDialog(true);
    };

    const onExecute = () =>{
        setIsConfirmDialog(false);
        switch(executeType.bulkType){
            case "BulkRegistration":
                registerAllFavorites();
                break;
                case "BulkCancellation":
                clearAllFavorites();
                break;
            case "None":
                break;
        }

        onUpdate()
    };

    const onClose = () =>{
        setIsConfirmDialog(false);
        setExecuteType({bulkType:"None"});
    };


    // お気に入り登録処理
    const registerAllFavorites = () =>{
        horses.forEach(horse => {
            const isFavorite = favoriteService.isFavorite(horse.id);
            if(!isFavorite){
                favoriteService.addFavorite(horse);
            }
        });
    }
    
    // お気に入り解除処理
    const clearAllFavorites = () =>{
        favoriteService.clearAllFavorites();
    }

    return (
    <div className="flex gap-4 justify-end p-4 bg-gray-50 border-t">
        {/* <button
        type="button"
        onClick={handleBulkRegister}
        className={'px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700'}>
        一括登録
        </button> */}
        
        <button
        type="button"
        onClick={handleBulkUnregister}
        className={'px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-red-600 text-white hover:bg-red-700'}
        >
        クリア
        </button>
        <ConfirmDialog 
            open={isConfirmDialog}
            onClose={onClose}
            onExecute={onExecute}
            exeuteType={executeType}/>
    </div>
    );
};
